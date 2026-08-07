const list = ["1", { a: 2, b: 3, value: 10 }, null, undefined];

// expected output = [10, 100]

function clean(item: any, result: number[]) {

    if (item === null || item === undefined) return;

    // since right now we are assuming if it's an object it will must have value property but  it might be either string or int
    if (typeof item === "object") {
        result.push(Number(item.value) * 10);
        return;
    }

    // as we assumed here the item can only be null, undefined, object or number or string which is why below had to wrapped with Number

    const number = Number(item);

    if (!Number.isNaN(number)) {
        result.push(number * 10);
    }

    return;

}


function iterate(data: any[], result = []) {

    // const result = [];

    for (const value of data) clean(value, result);

    return result;

}