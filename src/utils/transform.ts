import { omit } from 'lodash';

/**
 *  将数据转换为数组形式
 * @param data
 * @example transformToArray('str') ======> ['str']
 * @example transformToArray(['str']) ======> ['str']
 */
export const transformToArray = <ArrayItem>(
  data: ArrayItem | ArrayItem[],
): ArrayItem[] => {
  if (!Array.isArray(data)) {
    return [data];
  }
  return data;
};

/**
 * @description: 解构树，把树扁平化为数组
 * @param {Array} trees 待解析的树集合，可以解析多棵树
 * @param {*} children 子节点名称
 * @param {string} attrs 需要返回的属性集合
 * @return {*}
 */
export const extractTrees = <TreeNode extends Record<string, any>>(
  trees: TreeNode[],
  children = 'children',
): TreeNode[] => {
  if (!trees?.length || typeof children !== 'string') {
    return [];
  }
  const list: TreeNode[] = [];
  const getTreeNode = (tree: TreeNode[]) => {
    tree.forEach((treenode) => {
      list.push(omit(treenode, children) as TreeNode);
      if (treenode[children]) {
        Object.keys(treenode[children]).forEach((childKey) => {
          getTreeNode([treenode[children][childKey]]);
        });
      }
    });
    return list;
  };
  return getTreeNode(trees);
};

/**
 * 将平铺的树节点转换成嵌套的树结构
 */
export const transformToNestedTree = <TreeNode extends Record<string, any>>(
  list: TreeNode[],
  rootKey: string = '',
  { key = 'link', parentKey = 'parentLink', childName = 'children' } = {},
): TreeNode[] => {
  if (!Array.isArray(list)) {
    return list;
  }

  const nodeMap: Record<string, any> = {};
  const result: TreeNode[] = [];

  list.forEach((item) => {
    const id = item[key];
    const parentId = item[parentKey];

    nodeMap[id] = !nodeMap[id] ? item : { ...item, ...nodeMap[id] };
    const treeNode = nodeMap[id];

    if (parentId === rootKey) {
      result.push(treeNode);
    } else {
      if (!nodeMap[parentId]) {
        nodeMap[parentId] = {};
      }

      if (!nodeMap[parentId][childName]) {
        nodeMap[parentId][childName] = [];
      }

      nodeMap[parentId][childName].push(treeNode);
    }
  });

  return result;
};
