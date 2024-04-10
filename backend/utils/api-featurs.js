class apiFeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString= queryString;
    }

    filter(){
        const queryObj = {...this.queryString,verified:{$ne:false}};
        const excludeField =['page','sort','limit','fields'];
        excludeField.forEach((ele)=>delete queryObj[ele]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
        this.query =this.query.find(JSON.parse(queryStr));
        return this
    }
    sort(){
        if(this.queryString.sort){
            const sortString = (this.queryString.sort).toString().split(',').join(' ')
            this.query.sort(sortString)
        }
        return this
    }
}



module.exports = apiFeatures