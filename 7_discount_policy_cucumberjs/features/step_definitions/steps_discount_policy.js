const {Given, When, Then, BeforeAll} = require('@cucumber/cucumber');
const assert = require('assert');
const DiscountPolicyService = require('../../DiscountPolicyService.js');

let dps, hasDiscountCard, hasStudentCard, listPrice, discountedPrice;

BeforeAll( () => {
    dps = new DiscountPolicyService();
});

Given(/^the customer has (no|a) (.+)$/, function (noa, cardType) {
    if (noa === 'a') {
        if (cardType === 'discount card') hasDiscountCard = true;
        if (cardType === 'student card') hasStudentCard = true;
    }
    if (noa === 'no') {
        if (cardType === 'discount card') hasDiscountCard = false;
        if (cardType === 'student card') hasStudentCard = false;
    }
});

Given(/^the list price is (\d+) EUR$/, function (thePrice) {
    listPrice = thePrice;
});

When(/^the discounted price is calculated$/, function () {
    discountedPrice = dps.calcDiscountedPrice(listPrice,
                                              hasDiscountCard,
                                              hasStudentCard);
});

Then(/^the discounted price is (\d+) EUR$/, function (expectedPrice) {
    assert.strictEqual(discountedPrice,expectedPrice);
});