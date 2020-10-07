export const sortData = (data) => {
    const sortedData = [...data]

    // es6 version
    // return sortedData.sort((a,b) => (a.cases>b.cases ? -1:1))

    sortedData.sort((a,b) => {
        if(a.cases > b.cases){
            return -1;
        } else {
            return 1;
        }
    });

    return sortedData;
}