const { nanoid } = require("nanoid")
const dataProducts = require('../data/dataProducts.json');
const dataCategorys = require('../data/categorys.json');
const { filterCategorys, filterPages, filterSearch } = require('../helper/filter')

const getProducts = (req, res) => {
  const {search, category, limit, page} = req.query
  console.log(category)
  let resultDataTemp;
  if(search){
    resultDataTemp = filterSearch(dataProducts, search)
    resultData = filterPages(resultDataTemp, page, limit)
  }else if(category){
    resultDataTemp = filterCategorys(dataProducts, category)
    resultData = filterPages(resultDataTemp, page, limit)
  }else{
    resultDataTemp = dataProducts
    resultData = filterPages(resultDataTemp, page, limit)
  }

  try {
    return res.status(200).json({
      page: resultData.pagesNumber,
      totalPage: resultData.totalPage,
      success: true,
      message: "Success Get Product",
      results: resultData.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

const getDetailProduct = (req, res) => {
  try {
    const id = req.param('id');
    const index = dataProducts.findIndex((n) => n.id === id)
    if(index !== -1){
      return res.status(200).json({
        success: true,
        message: "Success Get Product Detail",
        results: dataProducts[index],
      });
    }else{
      return res.status(400).json({
        success: false,
        message: "Product does not exist",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

const createProduct = async (req, res) => {
  try {
    const { categoryName, description, sku, name, weight, width, length, height, image, price } = req.body;
    const idCategory = dataCategorys.findIndex((n) => n.categoryName === categoryName)
    console.log(categoryName, description, sku, nameProduct, weight, width, length, height, image, price)
    const id = nanoid()
    const newProduct = {
      "id": id,
      "description": description,
      "categoryId": dataCategorys[idCategory].id,
      "categoryName": categoryName,
      "sku": sku,
      "name": name,
      "weight": weight,
      "width": width,
      "length": length,
      "height": height,
      "image": image,
      "price": price,
      "createdAt": new Date().toISOString().slice(0, 10),
    };
    dataProducts.push(newProduct)

    const isSuccess = dataProducts.filter((product) => product.id === id).length > 0;
    if (isSuccess) {
      return res.status(200).json({
        success: true,
        message: "Success Create Product",
        results: newProduct,
      });
    } else {
      throw new Error('Failed Create Product');
    }

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateProduct = (req, res) => {
  try {
    const id = req.param('id');
    const { categoryName, description, sku, name, weight, width, length, height, image, price } = req.body;
    const idCategory = dataCategorys.findIndex((n) => n.categoryName === categoryName)
    const index = dataProducts.findIndex((n) => n.id == id)
    if (index > -1) {
      dataProducts[index] = {
        ...dataProducts[index],
        "description": description,
        "categoryId": dataCategorys[idCategory].id,
        "categoryName": categoryName,
        "sku": sku,
        "name": name,
        "weight": weight,
        "width": width,
        "length": length,
        "height": height,
        "image": image,
        "price": price
      };
      return res.status(200).json({
        success: true,
        message: "Success Update Product",
        results: dataProducts[index],
      });
    } else {
      throw new Error('Failed Update Product');
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

const deleteProduct = (req, res) => {
  try {
    const id = req.param('id');
    const index = dataProducts.findIndex((n) => n.id === id)
    if (index !== -1) {
      dataProducts.splice(index, 1)
      return res.status(200).json({
        success: true,
        message: "Success Delete Product",
      });
    } else {
      throw new Error('Failed Delete Product');
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}


module.exports = { createProduct, getProducts, updateProduct, deleteProduct, getDetailProduct }