const { constants } = require('../../constants');

import Page from '../page';

class SupportSearchLanding extends Page {
    get searchInput() { return $('[data-qa-search-landing-input] input'); }
    get documentationResults() { return this.resultsSection('Documentation'); }
    get communityResults() { return this.resultsSection('Community Posts'); }
    get viewMoreDocumentation() { return this.viewMoreResults('Documentation'); }
    get viewMoreCommunity() { return this.viewMoreResults('Community Posts'); }
    get searchResult() { return '[data-qa-search-result]'; }
    get searchResults() { return $$(this.searchResult); }

    searchLandingDisplays(){
        this.searchInput.waitForVisible(constants.wait.normal);
        this.documentationResults.waitForVisible(constants.wait.normal);
        this.communityResults.waitForVisible(constants.wait.normal);
        this.viewMoreDocumentation.waitForVisible(constants.wait.normal);
        this.viewMoreCommunity.waitForVisible(constants.wait.normal);
    }

    search(query){
        this.searchInput.setValue(query);
        browser.pause(1000);
        browser.waitUntil(() => {
            return this.searchResults.length > 0;
        }, constants.wait.long);
    }

    viewMoreResults(resultType){
        return $(`[data-qa-view-more="${resultType}"]`);
    }

    resultsSection(resultType){
        return $(`[data-qa-results="${resultType}"]`);
    }

    resultSet(resultType){
        this.resultsSection(resultType).waitForVisible(constants.wait.normal);
        return this.resultsSection(resultType).$('..').$$(this.searchResult);
    }

}

export default new SupportSearchLanding();
