/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* 'RSS Feeds' Suite */
    describe('RSS Feeds', function() {
        /* Test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has defined URL that is not empty for each feed', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }); 
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has defined name that is not empty for each feed', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });   
        });
    });

    /* 'The Menu' suite */
    describe('The menu', function() {
        var menu = document.getElementsByTagName('body')[0];
        var icon = document.getElementsByClassName('icon-list')[0];
        
        /* Test that ensures the menu element is hidden by default. */
        it('is hidden by default', function() {
            expect(menu.classList).toContain('menu-hidden');
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('changes visibility when the icon is clicked', function() {
            // First click - show?
            icon.click();
            expect(menu.className).not.toContain('menu-hidden');
            // Second click - hide again?
            icon.click();
            expect(menu.className).toContain('menu-hidden');
        });
    });

    /* 'Initial Entries' suite */
    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('.feed contains at least one .entry after loadFeed runs', function(done) {
            var feed = document.getElementsByClassName('feed')[0];
            var entryCount = feed.getElementsByClassName('entry').length;

            expect(entryCount).not.toBe(0);
            done();
        });
    });

    /* 'New Feed Selection' suite */
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var content;
        var newContent;

        beforeEach(function(done) {
            loadFeed(1, function() {
            content = document.getElementsByClassName('feed')[0].innerHTML;    
                loadFeed(2, function() {
                    newContent = document.getElementsByClassName('feed')[0].innerHTML;
                    done();
                });
            });
        });

        it('feed selection changes after running the loadFeed function', function(done) {
            expect(content).toBeDefined();
            expect(newContent).toBeDefined();
            expect(content).not.toEqual(newContent);
            done();
        });
    });
}());
