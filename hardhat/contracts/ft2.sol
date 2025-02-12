// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FoodTraceabilityLite {
    
    struct Ingredient {
        string name;
        string source;
        string supplier;
        string batchId;
        string processingDetails;
    }

    struct Product {
        string name;
        string batchId;
        string[] ingredientBatchIds;
    }

    mapping(string => Ingredient) private ingredients;
    mapping(string => Product) private products;

    constructor() {
        _addTestData();
    }

    function getProductDetails(string memory _batchId) public view returns (
        string memory productName,
        string memory batchId,
        string memory formattedDetails
    ) {
        require(bytes(products[_batchId].batchId).length > 0, "Product does not exist");

        Product storage product = products[_batchId];
        string memory details = "";

        for (uint i = 0; i < product.ingredientBatchIds.length; i++) {
            Ingredient storage ing = ingredients[product.ingredientBatchIds[i]];
            details = string(abi.encodePacked(
                details,
                "Ingredient: ", ing.name, ", ",
                "Source: ", ing.source, ", ",
                "Supplier: ", ing.supplier, ", ",
                "Processing: ", ing.processingDetails, " | "
            ));
        }

        return (product.name, product.batchId, details);
    }

    function _addTestData() private {
        // Adding Ingredients
        ingredients["I2001"] = Ingredient("Potatoes", "Agra, Uttar Pradesh", "Agra Fresh Farms", "I2001", "Washed & Peeled");
        ingredients["I2002"] = Ingredient("Gram Flour (Besan)", "Bikaner, Rajasthan", "Bikaner Agro Mills", "I2002", "Roasted & Milled");
        ingredients["I2003"] = Ingredient("Black Salt", "Sambhar Lake, Rajasthan", "Sambhar Salts Pvt Ltd", "I2003", "Sun-Dried");
        ingredients["I2004"] = Ingredient("Turmeric", "Erode, Tamil Nadu", "Erode Spices Ltd", "I2004", "Dried & Powdered");
        ingredients["I2005"] = Ingredient("Chilli Powder", "Guntur, Andhra Pradesh", "Guntur Spice Traders", "I2005", "Dried & Ground");
        ingredients["I2006"] = Ingredient("Raw Banana", "Thrissur, Kerala", "Kerala Banana Corp", "I2006", "Sliced & Dried");
        ingredients["I2007"] = Ingredient("Coconut Oil", "Udumalpet, Tamil Nadu", "CocoPure Oils", "I2007", "Cold Pressed");
        ingredients["I2008"] = Ingredient("Salt", "Tuticorin, Tamil Nadu", "Tuticorin Salt Co.", "I2008", "Sea Salt Refined");
        ingredients["I2009"] = Ingredient("Black Pepper", "Kochi, Kerala", "Kochi Pepper Mills", "I2009", "Sun-Dried & Crushed");
        ingredients["I2010"] = Ingredient("Peanuts", "Junagadh, Gujarat", "Gujarat Nut Suppliers", "I2010", "Roasted & Shelled");
        ingredients["I2011"] = Ingredient("Cumin", "Unjha, Gujarat", "Unjha Spice Traders", "I2011", "Dried & Ground");
        ingredients["I2012"] = Ingredient("Asafoetida (Hing)", "Hathras, Uttar Pradesh", "Hathras Herbs Ltd", "I2012", "Fermented & Dried");

        // Adding Products with Indian Snack Names
        products["P3001"] = Product("Aloo Bhujia", "P3001", new string[](0));
        products["P3001"].ingredientBatchIds.push("I2001"); // Potatoes
        products["P3001"].ingredientBatchIds.push("I2002"); // Gram Flour (Besan)
        products["P3001"].ingredientBatchIds.push("I2003"); // Black Salt
        products["P3001"].ingredientBatchIds.push("I2004"); // Turmeric
        products["P3001"].ingredientBatchIds.push("I2005"); // Chilli Powder

        products["P3002"] = Product("Banana chips", "P3002", new string[](0));
        products["P3002"].ingredientBatchIds.push("I2006"); // Raw Banana
        products["P3002"].ingredientBatchIds.push("I2007"); // Coconut Oil
        products["P3002"].ingredientBatchIds.push("I2008"); // Salt
        products["P3002"].ingredientBatchIds.push("I2009"); // Black Pepper

        products["P3003"] = Product("Masala peanuts", "P3003", new string[](0));
        products["P3003"].ingredientBatchIds.push("I2010"); // Peanuts
        products["P3003"].ingredientBatchIds.push("I2002"); // Gram Flour (Besan)
        products["P3003"].ingredientBatchIds.push("I2005"); // Chilli Powder
        products["P3003"].ingredientBatchIds.push("I2011"); // Cumin
        products["P3003"].ingredientBatchIds.push("I2012"); // Asafoetida (Hing)

        products["P3004"] = Product("Sev", "P3004", new string[](0));
        products["P3004"].ingredientBatchIds.push("I2002"); // Gram Flour (Besan)
        products["P3004"].ingredientBatchIds.push("I2005"); // Chilli Powder
        products["P3004"].ingredientBatchIds.push("I2008"); // Salt
        products["P3004"].ingredientBatchIds.push("I2011"); // Cumin

        products["P3005"] = Product("Chikki", "P3005", new string[](0));
        products["P3005"].ingredientBatchIds.push("I2010"); // Peanuts
        products["P3005"].ingredientBatchIds.push("I2007"); // Coconut Oil
        products["P3005"].ingredientBatchIds.push("I2008"); // Salt
    }
}