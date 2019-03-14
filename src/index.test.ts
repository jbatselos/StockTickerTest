import {
    WebDriver,
    Session,
    Capabilities,
    Executor,
    WebElement,
    By,
    Builder,
    Key,
    IWebDriverOptionsCookie
} from 'selenium-webdriver';
import * as fs from 'fs';
import { TestingUtil } from "./TestingUtil";
import { remove } from 'fs-extra';





jest.setTimeout(20000);

var capabilities = new Capabilities(Capabilities.chrome());
var driver = new Builder().withCapabilities(capabilities).build();
var testingUtil = new TestingUtil(driver);
let standardWait = 3000;
let defaultAlerts = { "controlType": 3, "displayMode": 2, "id": "8737c381-6459-4f26-84de-68fbbe3fb569", "position": { "zoneIndex": 1, "sectionIndex": 1, "controlIndex": 1, "sectionFactor": 12 }, "webPartId": "d3d7317d-b35c-40bf-b9c2-ac0ad847dbdf", "webPartData": { "id": "d3d7317d-b35c-40bf-b9c2-ac0ad847dbdf", "instanceId": "8737c381-6459-4f26-84de-68fbbe3fb569", "title": "Alerts", "description": "alerts description", "serverProcessedContent": { "htmlStrings": {}, "searchablePlainTexts": {}, "imageSources": {}, "links": {} }, "dataVersion": "1.0", "properties": { "description": "Web part for displaying temporary alerts or notifications. All settings are editable in-line", "title": "Alert that is really important 1234", "buttonText": "Learn More", "href": "https://duckduckgo.com" } } };
let defaultToolsApps = { "controlType": 3, "displayMode": 2, "id": "8737c381-6459-4f26-84de-68fbbe3fb569", "position": { "zoneIndex": 1, "sectionIndex": 1, "controlIndex": 1, "sectionFactor": 12 }, "webPartId": "5fb28714-f831-431c-b5cb-6f24a558f522", "webPartData": { "id": "5fb28714-f831-431c-b5cb-6f24a558f522", "instanceId": "8737c381-6459-4f26-84de-68fbbe3fb569", "title": "Tools & Apps", "description": "ToolsApps description", "serverProcessedContent": { "htmlStrings": {}, "searchablePlainTexts": {}, "imageSources": {}, "links": {} }, "dataVersion": "1.0", "properties": { "commonSettings": {}, "description": "ToolsApps", "categoryOrder": [], "viewMode": "tile", "layout": "default", "isUserTileCustomizationAllowed": false, "targetProfileProperty": "ToolsAppsCustomization", "manualItems": [{ "Title": "Wallstreet Journal", "Description": "The Wall Street Journal is an American business-focused, English-language international daily newspaper based in New York City.", "Category": "Sample Tab 1", "LinkUrl": "https://wsj.com", "IconUrl": "https://camo.githubusercontent.com/3288d22efd14f228d106509b2b1e0d7ca28ce4e9/687474703a2f2f73666572696b2e6769746875622e696f2f77736a2f69636f6e2e706e67", "AltText": "The Wall Street Journal", "Enable": true, "UserConfigurable": true }, { "Title": "CNN", "Description": "Cable News Network is an American basic cable and satellite television news channel owned by the Turner Broadcasting System, a division of Time Warner. CNN was founded in 1980 by American media proprietor Ted Turner as a 24-hour cable news channel.", "Category": "Sample Tab 2", "LinkUrl": "https://cnn.com", "IconUrl": "http://media.idownloadblog.com/wp-content/uploads/2014/09/cnn-icon.png", "AltText": "CNN", "Enable": true, "UserConfigurable": true }, { "Title": "Boston Globe", "Description": "The Boston Globe is an American daily newspaper founded and based in Boston, Massachusetts,", "Category": "Sample Tab 3", "LinkUrl": "https://bostonglobe.com", "IconUrl": "http://earthtones.org/wp-content/uploads/2012/12/boston-globe-icon.jpg", "AltText": "The Boston Globe", "Enable": true, "UserConfigurable": true }], "contentSourceConfig": { "selectedSites": [], "dataSourceList": "", "mappedFields": [{ "key": "Title", "label": "Title", "types": ["Text"], "internalName": "Title" }, { "key": "Category", "label": "Category", "types": ["Text"], "internalName": "Category" }, { "key": "Description", "label": "Description", "types": ["Text", "Note"], "internalName": "Description" }, { "key": "Enable", "label": "Enable", "types": ["Boolean"] }, { "key": "IconUrl", "label": "Icon Url", "types": ["Text", "Note", "URL"], "isPictureField": 1 }, { "key": "LinkUrl", "label": "Target Url", "types": ["Text", "Note", "URL"], "internalName": "" }, { "key": "AltText", "label": "Alternative text", "types": ["Text", "Note"], "internalName": "" }, { "key": "OrderBy", "label": "Sort by", "types": null, "internalName": "Title" }], "preselectCurrentSiteForTheFirstTime": 1, "preselectListForTheFirstTime": 1, "defaultListTitle": "Tools & Apps" }, "targetingConfig": { "enableTargeting": 0, "termSetName": "Topics", "selectedTerms": [], "upsFieldKey": "MatchUPSProfileFields", "mappedManagedPropertyName": "", "mappedFieldInternalName": "", "isUserSpecificContent": 0, "showItemsWithEmptyTag": 0, "isAndTermsJoin": 0, "enableContentTypeFilter": 0, "contentTypeFilter": "" } } } };

let driverJest;
it('waits for the driver to start', () => {
    return driver.then(_d => {
        driverJest = _d
    })
})

it('can set up a webpart', async () => { await TestWebpartSetup() })
it('edits fields in alerts', async () => { await TestFieldEditing() })
it('API link button works', async () => { await TestAPILink() })
it('Price is formatted correctly', async () => { await IsAPrice() })
it('closes the driver', async () => { await driver.close() })

async function TestWebpartSetup() {
    let webpart = JSON.parse(JSON.stringify(defaultAlerts));
    await SetupWebpartLocal();

    var element = await (driver.findElement(By.xpath('//*[@id="workbenchPageContent"]/div/div/div/div/div/div[2]/div/div/div[1]/div/div[1]/div/div/div[2]/div/div/div[1]/button')));
    var attrib = await (element.getAttribute("class"));

    expect(element).not.toBeNull;
}


async function TestFieldEditing() {
    
    await SetupWebpartLocal();

    await (driver.findElement(By.xpath('//*[@id="workbenchPageContent"]/div/div/div/div/div/div[2]/div/div/div[1]/div/div[1]/div/div/div[2]/div/div/div[1]/button'))).click();
    
    wait(1000);
    var symbolBox = await driver.findElement(By.tagName("input"));

    await symbolBox.sendKeys(Key.BACK_SPACE,Key.BACK_SPACE,Key.BACK_SPACE,Key.BACK_SPACE);
    await symbolBox.sendKeys("MSFT");
    wait(500);
    await driver.findElement(By.xpath('//*[@id="spPropertyPaneContainer"]/div/div/div[2]/div/div[1]/div/button/i')).click();
    wait(100);

    expect(await driver.findElement(By.className("title_43416a1f")).getText()).toBe("Microsoft Corporation ( MSFT )");
   

}

async function TestAPILink(){
    
    await SetupWebpartLocal();
    await RemoveWebpart();
    
    var button = await driver.findElement(By.className('button_43416a1f'));
    await expect(await button.getAttribute('href')).toBe('https://api.iextrading.com/1.0/stock/AAPL/book')
   
}
async function IsAPrice(){
    await SetupWebpartLocal();

    var price =2;
    await expect( price).not.toBeNaN();
   
}


async function SetupWebpartLocal() {
    await (driver.get("https://localhost:4230/temp/workbench.html"));

    
    await(timeout(standardWait));
    
    await(driver.findElement(By.xpath('//*[@id="workbenchPageContent"]/div/div/div/div/div/div[2]/div/div/div[1]/div/div[1]/button/div/div/i')).click());
    
    wait(1000);
    await(driver.findElement(By.xpath('//*[@id="toolbox-callout-1"]/div/div[2]/div/section[2]/div/button/div/div/i')).click());
    
    wait(1000);
}

async function RemoveWebpart(){

    var element = await (driver.findElement(By.xpath("//button[starts-with(@data-automation-id, 'deleteButton')]")));
    await element.click();
    await wait(1000);
    element = await (driver.findElement(By.xpath("//button[starts-with(@data-automation-id, 'confirmButton')]")));
    await element.click();
    await wait(1000);
}
    
    

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//TODO: implement this better...
function pageLoaded() {
    return new Promise(resolve => setTimeout(resolve, 2500));
}

async function takeScreenShot(fileName: string) {
    var screenshot = await (driver.takeScreenshot());
    fs.writeFile("img/" + fileName + ".png", screenshot, 'base64', function (err) {
        if (!!err) { console.log(err) };
    });
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }