"use strict";

/*
|--------------------------------------------------------------------------
| ImageSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Database = use("Database");
const Scraper = require("images-scraper"),
 bing = new Scraper.Bing();

class ImageSeeder {
  async run() {
    console.log("running imageseeder ...");
    // Runs the images-scraper script to search for and
    // copy image urls into the images table of database
    const numImagesToScrape = 20;
    try {
      console.log("line 27, trying to scrape (with bing)...");

      const scrape = await bing.list({
        keyword: 'sad animal facts site:sadanimalfacts.com',
        num: numImagesToScrape,
        detail: true
      })
      console.log("line 34, got a list ...");
      console.log(`first ${scrape.length} results from bing`);
      // console.log(scrape);
      
      for (let i = 0; i < scrape.length; i++) {
        // console.log("line 39, url for image", i);
        
        const image = scrape[i];
        // console.log(image.url);
        // console.log(i);
        const imageId = await Database.table("images").insert({
          height: image.height,
          width: image.width,
          type: image.format,
          img_url: image.url,
          created_at: Database.fn.now(),
          updated_at: Database.fn.now()
        });
      }
    } catch (err) {
      console.log("err", err);
    }
    Database.close();
  }
}

module.exports = ImageSeeder;
