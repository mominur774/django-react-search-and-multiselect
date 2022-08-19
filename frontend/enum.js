export const makeEnumFriendly = (arr) => {
    arr.filter(r => {
        r['value'] = r.id
        r['label'] = r.name
    })
    return arr
}

export const enumList = (dataList, valueList) => {
    dataList?.filter(data => {
        valueList?.filter(value => {
            if (value === data.id) return data.value
        })
    })
}