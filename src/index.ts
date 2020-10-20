import axios from 'axios';
import * as dotenv from 'dotenv';
import { Webhook } from 'webhook-discord';
import { timeout } from "./helpers";
import cheerio from "cheerio";
dotenv.config();
// checkForStock();
checkBestBuyForStock(1);
checkNeweggStock(1);

// async function checkForStock() {
//     console.log('hello');
//     const productID = 30042;
//     const axiosResponse = await axios.get('https://api.nvidia.partners/edge/product/search?page=1&limit=9&locale=en-us');

//     const products: any[] = axiosResponse.data?.searchedProducts?.productDetails;
//     if (products) {
//         const desiredProduct = products.find(product => product.productID === productID);
//         let isInStockNvidia = isInStockNvidiaa(desiredProduct);
//         let isInStockBestBuy = isInStockBestBuyy(desiredProduct);

//         while (isInStockBestBuy === false && isInStockNvidia === false) {
//             const productID = 30042;
//             const axiosResponse = await axios.get('https://api.nvidia.partners/edge/product/search?page=1&limit=9&locale=en-us');

//             const products: any[] = axiosResponse.data?.searchedProducts?.productDetails;
//             if (products) {
//                 const desiredProduct = products.find(product => product.productID === productID);
//                 isInStockNvidia = isInStockNvidiaa(desiredProduct);
//                 isInStockBestBuy = isInStockBestBuyy(desiredProduct);
//             }
//             else {
//                 console.log('No products found on Nvidia site');
//                 const myWebHook = new Webhook(process.env.myWebHookNotificationURL!);
//                 myWebHook.err('errorBot', 'Specified product not found');
//                 break;
//             }
//             await timeout(10000);
//         }

//         if (isInStockBestBuy) {
//             const myWebHook = new Webhook(process.env.jacob!);
//             myWebHook.info('bestBuyBot', '3080 in Stock!!--- https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440')


//         }
//         if (isInStockNvidia) {
//             const myWebHook = new Webhook(process.env.myWebHookNotificationURL!);
//             myWebHook.info('NvidiaBot', '3080 in Stock Go make sure to reload the page once!!--- https://www.nvidia.com/en-us/shop/geforce')
//         }
//     }
//     else {
//         console.log('No products found on Nvidia site');
//         const myWebHook = new Webhook(process.env.myWebHookNotificationURL!);
//         myWebHook.err('errorBot', 'Specified product not found');
//     }
//     await timeout(500);
//     checkForStock();
// }

// function isInStockNvidiaa(desiredProduct) {
//     const isInStockNvidia: boolean = desiredProduct.retailers[0].isAvailable;
//     return isInStockNvidia;
// }

// function isInStockBestBuyy(desiredProduct) {
//     const isInStockBestBuy: boolean = desiredProduct.retailers[1].isAvailable;
//     return isInStockBestBuy;
// }

async function checkBestBuyForStock(i: number) {
    if (i === 1) {
        const newWebHook = new Webhook(process.env.jacob!);
        newWebHook.info('StartBot', 'Bestbuy script has started');
    }

    const myWebHook = new Webhook(process.env.myWebHookNotificationURL!);
    const axiosResponse = await axios.get('https://www.bestbuy.com/site/searchpage.jsp?st=3080');
    const $ = cheerio.load(axiosResponse.data);

    const foundersEdition = $("#sku-list-1 .sku-item-list [data-sku-id='6429440'] .sku-list-item-button .btn").text();
    const gigabyteEdition = $("#sku-list-1 .sku-item-list [data-sku-id='6436219'] .sku-list-item-button .btn").text();
    const evgaGeforceEdition = $("#sku-list-1 .sku-item-list [data-sku-id='6436195'] .sku-list-item-button .btn").text();
    const evgaEdition = $("#sku-list-1 .sku-item-list [data-sku-id='6432400'] .sku-list-item-button .btn").text();
    const gigabyeGeforceEdition = $("#sku-list-1 .sku-item-list [data-sku-id='6430620'] .sku-list-item-button .btn").text();
    const evgaExpensiveEdition = $("#sku-list-1 .sku-item-list [data-sku-id='6436196'] .sku-list-item-button .btn").text();
    const evgaRTXEdition = $("#sku-list-1 .sku-item-list [data-sku-id='6436194'] .sku-list-item-button .btn").text();
    const MSIEdition = $("#sku-list-1 .sku-item-list [data-sku-id='6430175'] .sku-list-item-button .btn").text();
    const PNYEdition = $("#sku-list-1 .sku-item-list [data-sku-id='6432655'] .sku-list-item-button .btn").text();
    const eagleEdition = $("#sku-list-1 .sku-item-list [data-sku-id='6430621'] .sku-list-item-button .btn").text();
    const evgaLeastExpensiveEdition = $("#sku-list-1 .sku-item-list [data-sku-id='6432399'] .sku-list-item-button .btn").text();
    const gigabyteGeEdition = $("#sku-list-1 .sku-item-list [data-sku-id='6436223'] .sku-list-item-button .btn").text();
    const ASUSEdition = $("#sku-list-1 .sku-item-list [data-sku-id='6432445'] .sku-list-item-button .btn").text();
    const PNYGeEdition = $("#sku-list-1 .sku-item-list [data-sku-id='6432658'] .sku-list-item-button .btn").text();

    let arrayOf3080InStock = [foundersEdition, gigabyteGeEdition, gigabyteEdition, gigabyeGeforceEdition, evgaLeastExpensiveEdition, evgaRTXEdition, evgaEdition, evgaExpensiveEdition,
        evgaGeforceEdition, MSIEdition, PNYEdition, eagleEdition, ASUSEdition, PNYGeEdition];
    let arrayOf3080Names = ['foundersEdition', 'gigabyteGeEdition', 'gigabyteEdition', 'gigabyeGeforceEdition', 'evgaLeastExpensiveEdition', 'evgaRTXEdition', 'evgaEdition', 'evgaExpensiveEdition',
        'evgaGeforceEdition', 'MSIEdition', 'PNYEdition', 'eagleEdition', 'ASUSEdition', 'PNYGeEdition'];

    for (let index = 0; index < arrayOf3080InStock.length; index++) {
        if (arrayOf3080InStock[index] === 'Add to Cart') {
            switch (arrayOf3080Names[index]) {
                case 'foundersEdition':
                    myWebHook.info('BestBuyBot', 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440');
                    break;
                case 'gigabyteGeEdition':
                    myWebHook.info('BestBuyBot', 'https://www.bestbuy.com/site/gigabyte-geforce-rtx-3080-10g-gddr6x-pci-express-4-0-graphics-card-black/6436223.p?skuId=6436223');
                    break;
                case 'gigabyteEdition':
                    myWebHook.info('BestBuyBot', 'https://www.bestbuy.com/site/gigabyte-geforce-rtx-3080-10g-gddr6x-pci-express-4-0-graphics-card-white/6436219.p?skuId=6436219');
                    break;
                case 'gigabyeGeforceEdition':
                    myWebHook.info('BestBuyBot', 'https://www.bestbuy.com/site/gigabyte-geforce-rtx-3080-10g-gddr6x-pci-express-4-0-graphics-card-black/6430620.p?skuId=6430620');
                    break;
                case 'evgaLeastExpensiveEdition':
                    myWebHook.info('BestBuyBot', 'https://www.bestbuy.com/site/evga-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card/6432399.p?skuId=6432399');
                    break;
                case 'evgaRTXEdition':
                    myWebHook.info('BestBuyBot', 'https://www.bestbuy.com/site/evga-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card/6436194.p?skuId=6436194');
                    break;
                case 'evgaEdition':
                    myWebHook.info('BestBuyBot', 'https://www.bestbuy.com/site/evga-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card/6432400.p?skuId=6432400');
                    break;
                case 'evgaExpensiveEdition':
                    myWebHook.info('BestBuyBot', 'https://www.bestbuy.com/site/evga-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card/6436196.p?skuId=6436196');
                    break;
                case 'evgaGeforceEdition':
                    myWebHook.info('BestBuyBot', 'https://www.bestbuy.com/site/evga-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card/6436195.p?skuId=6436195');
                    break;
                case 'MSIEdition':
                    myWebHook.info('BestBuyBot', 'https://www.bestbuy.com/site/msi-geforce-rtx-3080-ventus-3x-10g-oc-bv-gddr6x-pci-express-4-0-graphic-card-black-silver/6430175.p?skuId=6430175');
                    break;
                case 'PNYEdition':
                    myWebHook.info('BestBuyBot', 'https://www.bestbuy.com/site/pny-geforce-rtx-3080-10gb-xlr8-gaming-epic-x-rgb-triple-fan-graphics-card/6432655.p?skuId=6432655');
                    break;
                case 'eagleEdition':
                    myWebHook.info('BestBuyBot', 'https://www.bestbuy.com/site/gigabyte-geforce-rtx-3080-10g-gddr6x-pci-express-4-0-graphics-card-black/6430621.p?skuId=6430621');
                    break;

                case 'ASUSEdition':
                    myWebHook.info('BestBuyBot', 'https://www.bestbuy.com/site/asus-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-strix-graphics-card-black/6432445.p?skuId=6432445');
                    break;
                case 'PNYGeEdition':
                    myWebHook.info('BestBuyBot', 'https://www.bestbuy.com/site/pny-geforce-rtx-3080-10gb-xlr8-gaming-epic-x-rgb-triple-fan-graphics-card/6432658.p?skuId=6432658');
                    break;

                default:
                    break;
            }
        }
    }
    await timeout(15000);
    if (i === 1) {
        i++;
    }
    checkBestBuyForStock(i);
}
async function checkNeweggStock(i: number) {
    if (i === 1) {
        const newWebHook = new Webhook(process.env.jacob!);
        newWebHook.info('StartBot', 'Newegg script has started');
    }
    const myWebHook = new Webhook(process.env.myWebHookNotificationURL!);
    const axiosResponse = await axios.get('https://www.newegg.com/p/pl?d=rtx+3080&N=4021%204022');
    const $ = cheerio.load(axiosResponse.data);

    const firstOnPage = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(1) .btn").text();
    const secondOnPage = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(2) .btn").text();
    const thirdOnPage = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(3) .btn").text();
    const fourthOnPage = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(4) .btn").text();
    const fifthOnPage = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(5) .btn").text();
    const sixthOnPage = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(6) .btn").text();
    const seventhOnPage = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(7) .btn").text();
    const eighthOnPage = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(8) .btn").text();
    const ninthOnPage = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(9) .btn").text();
    const eleventhOnPage = $(".item-cells-wrap:nth-of-type(4) .item-cell:nth-of-type(1) .btn").text();
    const twelvethOnPage = $(".item-cells-wrap:nth-of-type(4) .item-cell:nth-of-type(2) .btn").text();
    const thirteenthOnPage = $(".item-cells-wrap:nth-of-type(4) .item-cell:nth-of-type(3) .btn").text();
    const fourteenthOnPage = $(".item-cells-wrap:nth-of-type(4) .item-cell:nth-of-type(4) .btn").text();
    const fifthteenthOnPage = $(".item-cells-wrap:nth-of-type(4) .item-cell:nth-of-type(5) .btn").text();
    const sixthteenthOnPage = $(".item-cells-wrap:nth-of-type(4) .item-cell:nth-of-type(6) .btn").text();

    const hrefFirstOnPage: any = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(1) [title='View Details']").attr('href');
    const hrefSecondOnPage: any = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(2) [title='View Details']").attr('href');
    const hrefThirdOnPage: any = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(3) [title='View Details']").attr('href');
    const hrefFourthOnPage: any = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(4) [title='View Details']").attr('href');
    const hrefFifthOnPage: any = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(5) [title='View Details']").attr('href');
    const hrefSixthOnPage: any = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(6) [title='View Details']").attr('href');
    const hrefSeventhOnPage: any = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(7) [title='View Details']").attr('href');
    const hrefEighthOnPage: any = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(8) [title='View Details']").attr('href');
    const hrefNinthOnPage: any = $(".item-cells-wrap:nth-of-type(2) .item-cell:nth-of-type(9) [title='View Details']").attr('href');;
    const hrefEleventhOnPage: any = $(".item-cells-wrap:nth-of-type(4) .item-cell:nth-of-type(1) [title='View Details']").attr('href');
    const hrefTwelvethOnPage: any = $(".item-cells-wrap:nth-of-type(4) .item-cell:nth-of-type(2) [title='View Details']").attr('href');
    const hrefThirteenthOnPage: any = $(".item-cells-wrap:nth-of-type(4) .item-cell:nth-of-type(3) [title='View Details']").attr('href');
    const hrefFourteenthOnPage: any = $(".item-cells-wrap:nth-of-type(4) .item-cell:nth-of-type(4) [title='View Details']").attr('href');
    const hrefFifthteenthOnPage: any = $(".item-cells-wrap:nth-of-type(4) .item-cell:nth-of-type(5) [title='View Details']").attr('href');
    const hrefSixthteenthOnPage: any = $(".item-cells-wrap:nth-of-type(4) .item-cell:nth-of-type(6) [title='View Details']").attr('href');

    const arrayOf3080InStock = [firstOnPage, secondOnPage, thirdOnPage, fourthOnPage, fifthOnPage, sixthOnPage, seventhOnPage, eighthOnPage,
        ninthOnPage, eleventhOnPage, twelvethOnPage, thirteenthOnPage, fourteenthOnPage, fifthteenthOnPage, sixthteenthOnPage];

    // console.log(arrayOf3080InStock);
    for (let index = 0; index < arrayOf3080InStock.length; index++) {
        if (arrayOf3080InStock[index] === 'Add to cart ') {
            switch (index) {
                case 0:
                    myWebHook.info('InStockNow', hrefFirstOnPage);
                    break;
                case 1:
                    myWebHook.info('InStockNow', hrefSecondOnPage);
                    break;
                case 2:
                    myWebHook.info('InStockNow', hrefThirdOnPage);
                    break;
                case 3:
                    myWebHook.info('InStockNow', hrefFourthOnPage);
                    break;
                case 4:
                    myWebHook.info('InStockNow', hrefFifthOnPage);
                    break;
                case 5:
                    myWebHook.info('InStockNow', hrefSixthOnPage);
                    break;
                case 6:
                    myWebHook.info('InStockNow', hrefSeventhOnPage);
                    break;
                case 7:
                    myWebHook.info('InStockNow', hrefEighthOnPage);
                    break;
                case 8:
                    myWebHook.info('InStockNow', hrefNinthOnPage);
                    break;
                case 9:
                    myWebHook.info('InStockNow', hrefEleventhOnPage);
                    break;
                case 10:
                    myWebHook.info('InStockNow', hrefTwelvethOnPage);
                    break;
                case 11:
                    myWebHook.info('InStockNow', hrefThirteenthOnPage);
                    break;
                case 12:
                    myWebHook.info('InStockNow', hrefFourteenthOnPage);
                    break;
                case 13:
                    myWebHook.info('InStockNow', hrefFifthteenthOnPage);
                    break;
                case 14:
                    myWebHook.info('InStockNow', hrefSixthteenthOnPage);
                    break;

                default:
                    break;
            }

        }
    }
    await timeout(15000);
    if (i === 1) {
        i++;
    }
    checkNeweggStock(i);
}