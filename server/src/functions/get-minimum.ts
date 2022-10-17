export const getMin = (arr: number[]) => {
    let res: number = Number.MAX_VALUE;
    for(let i = 0; i < arr.length; ++i)
        if(arr[i] < res)
            res = arr[i];
    return res;
}