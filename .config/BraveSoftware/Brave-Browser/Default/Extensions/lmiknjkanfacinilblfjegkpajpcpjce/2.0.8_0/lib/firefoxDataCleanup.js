"use strict";

const {Filter, ActiveFilter} = require("filterClasses");
const {FilterNotifier} = require("filterNotifier");
const {FilterStorage} = require("filterStorage");
const {IO} = require("io");
const {Prefs} = require("prefs");
const {SpecialSubscription} = require("subscriptionClasses");

Promise.all([FilterNotifier.once("load"), Prefs.untilLoaded]).then(() => {
    if (Prefs.data_cleanup_done)
        return;

    if (FilterStorage.firstRun) {
        Prefs.data_cleanup_done = true;
        return;
    }

    let haveHitCounts = [];

    for (let key in Filter.knownFilters) {
        let filter = Filter.knownFilters[key];
        if (!(filter instanceof ActiveFilter))
            continue;

        if (filter.disabled) {
            // Enable or replace disabled filters
            filter.disabled = false;

            for (let subscription of filter.subscriptions) {
                if (subscription instanceof SpecialSubscription) {
                    while (true) {
                        let position = subscription.filters.indexOf(filter);
                        if (position < 0)
                            break;

                        let newFilter = Filter.fromText("! " + filter.text);
                        FilterStorage.removeFilter(filter, subscription, position);
                        FilterStorage.addFilter(newFilter, subscription, position);
                    }
                }
            }
        }

        if (filter.hitCount || filter.lastHit)
            haveHitCounts.push(filter);
    }

    // Reset hit statistics on any filters having them
    FilterStorage.resetHitCounts(haveHitCounts);

    // Remove any existing automatic backups
    let backups = [];
    for (let i = 1; i < 100; i++)
        backups.push(`file:patterns-backup${i}.ini`);
    browser.storage.local.remove(backups).then(() => {
        Prefs.data_cleanup_done = true;
    });
});
