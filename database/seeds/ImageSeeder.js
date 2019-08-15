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
    console.log("running imageseeder ...");
    // Runs the images-scraper script to search for and
    // copy image urls into the images table of database
    const numImagesToScrape = 20;
    try {
      console.log("line 26, trying to insert dummy...");
      const dummy = await Database.table("images").insert({
        height: 984,
        width: 980,
        type: "image/png",
        img_url:
          "https://66.media.tumblr.com/d881dc2ca9b9cd0e47e2d63e91feae3d/tumblr_p4wxbpYPPE1usi9s5o1_1280.png",
        created_at: Database.fn.now(),
        updated_at: Database.fn.now()
      });
      console.log("dummy: ", dummy);
      console.log("line 37, trying to scrape...");
      const scrape = await google.list({
        keyword: "sad animal facts site:sadanimalfacts.com",
        num: numImagesToScrape,
        detail: true,
        nightmare: {
          show: false //hides the chromium window that nightmare uses
        }
      });
      console.log("line 46, got a list ...");
      console.log(`first ${numImagesToScrape} results from google`);
      for (let i = 0; i < scrape.length; i++) {
        console.log("line 49, url for image", i);
        console.log(image.url);

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
