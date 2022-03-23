/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

 const { faker } = require('@faker-js/faker');


 class MockPost {
 
   constructor() {
 
     this['image_url'] = 'https://picsum.photos/800'
     this['image_placeholder'] = faker.image.dataUri()
     this['title'] = faker.lorem.words()
     this['date'] = faker.time.recent()
   }
 
   getData() {
     return {
       'image-url': this['image-url'],
       'image_placeholder': this['image_placeholder'],
       'title': this['title'],
       'date': this['date']
     }
   }
 
 }
 
 const mockPosts = [];
 
 let i = 0;
 while (i < 100) {
   mockPosts.push(new MockPost())
   i++;
 }
 
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('post').del()
  await knex('post').insert(mockPosts);
};
