'use strict';

(function RateHelper(from, to) {
  return new Promise(function (resolve, reject) {
    let url = `http://www.xe.com/currencyconverter/convert/?From=${from}&To=${to}`;
    request(url).spread(function (response, body) {
      let exchange_rate = $(body).find('.uccResUnit').find('.rightCol').text();

      // Use regex to get the proper rate
      let regex = new RegExp(`1\\s${to}\\s=\\s(.*)\\s${from}`);
      let search_result = exchange_rate.match(regex);

      if (search_result === null) {
        reject(`Cannot get exchange rate, invalid 'from' or 'to'`);
      } else {
        // Round 2 decimals
        let current_rate = Number(current_rate.match(regex)[1]).toFixed(2).toString();
        resolve(current_rate);
      }
    }).catch(function (error) {
      // Error
      reject(error);
    });
  });

  module.exports = RateHelper
})();
