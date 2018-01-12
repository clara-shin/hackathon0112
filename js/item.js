const SK_API_URL = "http://apis.skplanetx.com";
getShoppingList(Math.floor(Math.random() * 7));

function getShoppingList(idx) {
  const keywords = ["커피", "안전시설용품", "여행", "화장품", "영양제", "방한", "롱패딩"];
  const productArr = [];
  // console.log(keywords[idx]);
  //임시데이터
  // const productArr = new Array(10);
  // productArr[0] = {
  //   delivery: "무료배송",
  //   image: "http://i.011st.com/t/080/pd/18/9/8/9/5/1/5/gRvkd/1552989515_B.png",
  //   link: "http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=1552989515",
  //   name: "[할인가28,900/당일출고]맥심화이트320T/모카골드340T",
  //   price: 33930,
  //   saleprice: 31900
  // };
  // productArr[1] = {
  //   delivery: "무료배송",
  //   image: "http://i.011st.com/t/080/pd/18/6/3/3/7/0/3/BbXLN/1823633703_L300.jpg",
  //   link: "http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=1823633703",
  //   name: "프렌치카페 120T+160T/커피믹스/커피",
  //   price: 27970,
  //   saleprice: 26300
  // };
  // productArr[2] = {
  //   delivery: "무료배송",
  //   image: "http://i.011st.com/t/080/pd/18/7/7/6/0/3/7/wPWxW/1329776037_L300.jpg",
  //   link: "http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=1329776037",
  //   name: "쿠폰가 28900원 화이트골드 320T/ 모카골드 340T",
  //   price: 33930,
  //   saleprice: 31900
  // };
  // productArr[3] = {
  //   delivery: "무료배송",
  //   image: "http://i.011st.com/t/080/pd/18/0/1/8/6/9/2/NcXqN/1413018692_B.png",
  //   link: "http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=1413018692",
  //   name: "[당일출고/무료배송]맥심 화이트/모카골드400T+20T",
  //   price: 42440,
  //   saleprice: 39900
  // };
  // productArr[4] = {
  //   delivery: "무료배송",
  //   image: "http://i.011st.com/t/080/pd/17/4/8/6/2/6/5/yXuYi/1927486265_B.jpg",
  //   link: "http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=1927486265",
  //   name: "맥심 모카화이트골드 170Tx2박스 (총340T)",
  //   price: 33800,
  //   saleprice: 33800
  // };
  // productArr[5] = {
  //   delivery: "무료배송",
  //   image: "http://i.011st.com/t/080/pd/17/3/7/8/8/1/7/WlnQs/599378817_L300.jpg",
  //   link: "http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=599378817",
  //   name: "맥심카누미니120T/100T+사은품/카누라떼/카누더블샷",
  //   price: 18610,
  //   saleprice: 17500
  // };
  // productArr[6] = {
  //   delivery: "조건부무료",
  //   image: "http://i.011st.com/t/080/pd/17/5/8/3/6/1/8/FmKuJ/1792583618_L300.jpg",
  //   link: "http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=1792583618",
  //   name: "[쿠폰가 6,800원]루카스나인 라떼 30T(더블샷,돌체)",
  //   price: 8500,
  //   saleprice: 7990
  // };
  // productArr[7] = {
  //   delivery: "무료배송",
  //   image: "http://i.011st.com/t/080/an/1/0/0/4/3/1/1424100431_B_V41.jpg",
  //   link: "http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=1424100431",
  //   name: "[카누]카누 미니 100T + 사은품랜덤발송(텀블러,에코백,머그컵 등등 사은품)",
  //   price: 16900,
  //   saleprice: 16900
  // };
  // productArr[8] = {
  //   delivery: "무료배송",
  //   image: "http://i.011st.com/t/080/pd/17/2/7/7/0/8/2/JSoGn/1887277082_L300.jpg",
  //   link: "http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=1887277082",
  //   name: "[네스카페] 신선한모카/리치 330T + 모카 50T",
  //   price: 28610,
  //   saleprice: 26900
  // };
  // productArr[9] = {
  //   delivery: "무료배송",
  //   image: "http://i.011st.com/t/080/pd/18/9/0/5/5/3/7/ldcsl/136905537_L300.jpg",
  //   link: "http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=136905537",
  //   name: "맥심 화이트 골드 320T / 모카 골드 320T+증정 / 커피",
  //   price: 33930,
  //   saleprice: 31900
  // };

    PlanetX.api("get", `${SK_API_URL}/11st/common/products`, "JSON", {
      "version": 1,
      "page": 1,
      "count": 10,
      "searchKeyword": keywords[idx],
      "sortCode": "CP"
    }, function(r) {
      const resutPArr = r.ProductSearchResponse.Products.Product;
      for (let item of resutPArr) {
        let newItem = {};
        newItem.name = item.ProductName;
        newItem.price = item.ProductPrice;
        newItem.saleprice = item.SalePrice;
        newItem.image = item.ProductImage;
        newItem.delivery = item.Delivery;
        newItem.link = item.DetailPageUrl;
        productArr.push(newItem);
      }
      makeItemLists(productArr);
    }, function(e) {
      throw new Error(e);
    });
  //아이템 값을 넣어서 10개의 아이템박스 생성
}

function makeItemLists(productArr){
  const itemHeadEl = document.querySelector(".item-heading");
  let newItems = "";
  for (let i = 0; i < productArr.length; i++) {
    // const aTag = document.createElement('a');
    // aTag.attributes.href = 
    newItems += `<div class="item-data clearfix">
    <a href="${productArr[i].link}">
      <h5 class="item-data-name">${productArr[i].name}</h5>
      <p class="left">
        <img src="${productArr[i].image}" alt="${productArr[i].name}" class="item-image">
      </p>
      <p class="right">
        <span class="delivery">${productArr[i].delivery}</span>
        <strong class="dc-price">${productArr[i].saleprice}원</strong>
        <span class="origin-price">${productArr[i].price}원</span>
      </p>
    </a>
  </div>`;
  }
  itemHeadEl.parentElement.innerHTML += newItems;
}