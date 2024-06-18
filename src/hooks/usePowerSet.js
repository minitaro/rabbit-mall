/**
 * @description: 获取指定集合的幂集
 * @param {Array} originalSet - 原集
 * @param {Array} subSets - 幂集
 * @author TMC
 * @date 2023-05-16 17:46:20
 */
export const usePowerSet = (originalSet) => {
  const subSets = []
  const numberOfCombinations = 2 ** originalSet.length
  for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
    const subSet = []
    for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
      if (combinationIndex & (1 << setElementIndex)) {
        subSet.push(originalSet[setElementIndex])
      }
    }
    subSets.push(subSet)
  }

  return subSets
}
