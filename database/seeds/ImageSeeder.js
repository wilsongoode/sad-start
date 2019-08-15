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
  google = new Scraper.Google();

class ImageSeeder {
  async run() {
    // Runs the images-scraper script to search for and 
    // copy image urls into the images table of database
    const numImagesToScrape = 20;
    try {
      const scrape = await google.list({
        keyword: "sad animal facts site:sadanimalfacts.com",
        num: numImagesToScrape,
        detail: true,
        nightmare: {
          show: false //hides the chromium window that nightmare uses
        }
      });
      console.log(`first ${numImagesToScrape} results from google`);
      for (let i = 0; i < scrape.length; i++) {
        const image = scrape[i];
        // console.log(image.url);
        // console.log(i);
        const imageId = await Database.table("images").insert({
          height: image.height,
          width: image.width,
          type: image.type,
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
