import Api from "./Api";

export default{
    login(credentials){
        return Api().post('/login',credentials)
    },
    userRegistration(credentials){
        return Api().post('/userRegistration',credentials)
    },
    logout(){
        return Api().post('/logout');
    },
    getUsersInfo(){
        return Api().post('/getUsersInfo');
    },
    insertProduct(credentials){
        return Api().post('/insertProduct',credentials);
    },
    getAllProductInserted(){
        return Api().get('/getAllProductInserted');
    },
    getAllProduct(){
        return Api().get('/getAllProduct');
    },
    viewProduct(credentials){
        return Api().post('/viewProduct',credentials);
    },
    addToCart(credentials){
        return Api().post('/addToCart',credentials);
    },
    getMyProductCart(){
        return Api().get('/getMyProductCart');
    },
    checkout(credentials){
        return Api().post('/checkout',credentials);
    },
    editCart(credentials){
        return Api().post('/editCart',credentials);
    },
    viewProductCart(credentials){
        return Api().post('/viewProductCart',credentials);
    },
    trackMyorder(){
        return Api().get('/trackMyorder')
    },
    getAllItemsProccessed(){
        return Api().get('/getAllItemsProccessed');
    },
    pendingOrders(){
        return Api().get('/pendingOrders');
    },
    itemProcess(credentials){
        return Api().post('/itemProcess',credentials);
    },
    itemShipped(credentials){
        return Api().post('/itemShipped',credentials);
    },
    getAllItemsShipped(){
        return Api().get('/getAllItemsShipped');
    },
    riderSendApplication(credentials){
        return Api().post('/riderSendApplication',credentials);
    },
    getAllRidersApplicant(){
        return Api().get('/getAllRidersApplicant');
    },
    acceptRiderApplicant(credentials){
        return Api().post('/acceptRiderApplicant',credentials);
    },
    denyRiderApplicant(credentials){
        return Api().post('/denyRiderApplicant',credentials);
    },
    getDeliverItem(){
        return Api().get('/getDeliverItem');
    },
    getAllItemNeedtoDeliver(){
        return Api().get('/getAllItemNeedtoDeliver');
    },
    addTodeliver(credentials){
        return Api().post('/addTodeliver',credentials);
    },
    deliveredItem(credentials){
        return Api().post('/deliveredItem',credentials);
    },
    puchaseHistory(){
        return Api().get('/puchaseHistory');
    },
    Rateproduct(credentials){
        return Api().post('/Rateproduct',credentials);
    },
    confirmDelivery(credentials){
        return Api().post('/confirmDelivery',credentials);
    },
    deliveringItem(){
        return Api().get('/deliveringItem');
    },
    ProductSoldHistory(){
        return Api().get('/ProductSoldHistory');
    },
    getAllItemDelivered(){
        return Api().get('/getAllItemDelivered')
    },
    UpdateQuantity(credentials){
        return Api().post('/UpdateQuantity',credentials);
    },
    removeFromCart(credentials){
        return Api().post('/removeFromCart',credentials);
    },
    getAllInformation(){
        return Api().get('/getAllInformation');
    },
    changePassword(credentials){
        return Api().post('/changePassword',credentials);
    },
    changeAddress(credentials){
        return Api().post('/changeAddress',credentials);
    },
    changeInfo(credentials){
        return Api().post('/changeInfo',credentials);
    },
    changeProfilePic(credentials){
        return Api().post('/changeProfilePic',credentials);
    },
    addNewStocks(credentials){
        return Api().post('/addNewStocks',credentials);
    },
    getMyRoom(){
        return Api().get('/getMyRoom');
    },
    getAllRooms(){
        return Api().get('/getAllRooms');
    },
    getConvo(credentials){
        return Api().post('/getConvo',credentials);
    },
    allSales(){
        return Api().get('/allSales');
    },
    getAllRiders(){
        return Api().get('/getAllRiders');
    },
    unavailableStock(credentials){
        return Api().post('/unavailableStock',credentials);
    },
}