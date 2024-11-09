export const separateConsecutiveNumbers = (arr: number[]) => {
  if (arr.length === 0) return []

  const result = []
  let tempArray = [arr[0]]

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1] + 1) {
      tempArray.push(arr[i])
    } else {
      result.push(tempArray)
      tempArray = [arr[i]]
    }
  }

  result.push(tempArray) // Para adicionar o último grupo

  return result
}
