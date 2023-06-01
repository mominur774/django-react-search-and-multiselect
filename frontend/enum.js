export const makeEnumFriendly = (arr) => {
    arr.filter(r => {
        r['value'] = r.id
        r['label'] = r.name
    })
    return arr
}

export const getEnumItem = function (arr, val) {
    return arr?.find(({ value }) => value === val)
};

export const getEnumList = function (baseArr, arr) {
    const data = baseArr.filter(el => {
        return arr?.some(f => {
            return f === el.value;
        });
    });
    return data
};