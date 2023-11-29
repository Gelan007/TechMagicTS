function updateObjectInArray<ObjectShape>(
    initialArray: ObjectShape[],
    key: keyof ObjectShape,
    value: any,
    patch: Partial<ObjectShape>
): ObjectShape[] {
    const newArray = [...initialArray];

    newArray.forEach((obj, index) => {
        if (obj[key] === value) {
            newArray[index] = { ...obj, ...patch };
        }
    });

    return newArray;
}
