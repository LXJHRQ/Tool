// 14 + 1
function calculateChecksum(idWithoutChecksum) {
    const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const checksumDict = {
        0: '1', 1: '0', 2: 'X', 3: '9', 4: '8', 5: '7',
        6: '6', 7: '5', 8: '4', 9: '3', 10: '2'
    };

    const weightedSum = idWithoutChecksum.split('').reduce((sum, digit, index) => {
        return sum + parseInt(digit) * factors[index];
    }, 0);

    const checksumIndex = weightedSum % 11;
    const checksum = checksumDict[checksumIndex];
    return checksum;
}

function generatePossibleIds(prefix, gender) {
    const possibleIds = [];
    for (let i = 0; i < 1000; i++) {
        const suffix = i.toString().padStart(3, '0');
        const fullId = prefix + suffix;
        // 计算校验码
        const checksum = calculateChecksum(fullId);
        const fullIdWithChecksum = fullId + checksum;

        // 获取性别
        const generatedGender = parseInt(fullId.charAt(16)) % 2 === 0 ? 2 : 1;

        // 判断性别是否匹配
        if (gender === generatedGender) {
            possibleIds.push(fullIdWithChecksum);
        }
    }
    return possibleIds;
}

// 示例用法
const prefix = "XXXXXXXXXXXXXX";
const gender = 1; // 1为男性，2为女性
const possibleIds = generatePossibleIds(prefix, gender);
console.log(possibleIds.length)
possibleIds.forEach(fullId => {
    console.log(fullId);
});
