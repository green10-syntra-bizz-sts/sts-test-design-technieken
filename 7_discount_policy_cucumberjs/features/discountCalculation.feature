Feature: Calculating the Discounted Amount  

Customers with a discount card will receive 10% discount.
Customers with a student card will receive 12% discount. 
Customers with a student card and a discount card will receive 15% discount.

Scenario Outline: A customer receives the discount for <discount card status> and <student card status>
Given the customer has <discount card status>
And the customer has <student card status>
And the list price is <list price>
When the discounted price is calculated
Then the discounted price is <discounted price>

Examples:
  | discount card status | student card status | list price | discounted price |
  | no discount card     | no student card     |  100 EUR   |     100 EUR      |
  | a discount card      | no student card     |  100 EUR   |      90 EUR      |
  | no discount card     | a student card      |  100 EUR   |      88 EUR      |
  | a discount card      | a student card      |  100 EUR   |      85 EUR      |
