README prepared by Smit Sarang

macOS guide :

Have NODE installed in system

1. open terminal and pull this repo
2. go to repo
3. run "chmod +x setup.sh"
4. this will install npx and install package.json dependencies
5. Now you can run command "npx cypress open" to open cypress window
6. Select and run test name "amazon-buy-product.cy"
7. Post test run, you can observe "/screenshots" folder to refer test run screenshot img.

What can be expected more? 
1. As test suits grow, we have some functions which we use often like launchingURL post doing some cleaup, storing screenshot, login functions and some more. Hence commands can be expanded with such generic functions.
2. Even at each verification level screenshots can be taken and stored, to better have visible reference.
3. API can be automated.
4. Reporters can be added, so we do have one HTML file containing all required information.
5. More conditions can be added to code to give more test coverage.


Trade offs made:
1. Manually created amazon account.
2. removed "target" attribute of product search result hyper link becauase, Because Cypress runs in the browser, it will most likely not have multi-tabs support. We do have access to the browser automation APIs to actually switch tabs. To focus on functional automation first, link was opened in the same tab.
3. Cleared cookies before launching browser to prevemt duplicatation of items added in cart. Hence, current coverage only includes single item purchasing flow. 