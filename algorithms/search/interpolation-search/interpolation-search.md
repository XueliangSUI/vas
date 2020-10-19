# 插值查找（Interpolation Search）

## 正文内容

| 算法名称 | 类型 | 平均查找长度 | 时间复杂度 |      |
| -------- | ---- | ------------ | ---------- | ---- |
| 插值查找 | 有序 |              | O（log₂n） |      |

插值查找是基于折半查找的有序查找算法。

折半查找的缺点就是每次都需要从待查部分的中间查找。

但是当待查数key明显应当位于待查数组arr的开头或结束位置时，从中间查询是不明智的。

举例来说，当我们查英文字典时，apple和zero应当分别从开头和结尾查起更加容易。

因此插值查找的每次查询的原理就是：

待查索引 = 

低位索引 i + (待查值 key - 低位值arr[i]) / (高位值arr[j] - 低位值arr[i]) * (高位索引 j-低位索引 i)



## 二级标题



对有序数组取中间值并与待查找元素比较，若相等则完成查找，否则根据比较结果再取当前中间值左侧或右侧数组重复上一步行为。
