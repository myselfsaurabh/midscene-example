const assert = require('assert');

describe('eBay Search', () => {
    beforeEach(() => {
        browser.setWindowSize(1280, 800);
        browser.url('https://www.ebay.com');
        browser.waitUntil(() => browser.execute(() => document.readyState === 'complete'));
    });

    it('should open eBay and search for an item', async () => {
        ai,
        aiQuery,
        aiAssert,
        aiWaitFor,
        // 👀 type keywords, perform a search
          await ai('type "Headphones" in search box, hit Enter');
        
          // 👀 wait for the loading
          await aiWaitFor("there is at least one headphone item on page");
        
          // 👀 find the items
          const items = await aiQuery(
            "{itemTitle: string, price: Number}[], find item in list and corresponding price"
          );
        
          console.log("headphones in stock", items);
          expect(items?.length).toBeGreaterThan(0);
        
          // 👀 assert by AI
          await aiAssert("There is a category filter on the left");
    });

    it('should verify that the search results contain the item', () => {
        const searchResults = $$('.s-item__title');
        const itemFound = searchResults.some(result => result.getText().toLowerCase().includes('laptop'));
        
        assert.strictEqual(itemFound, true);
    });
});
