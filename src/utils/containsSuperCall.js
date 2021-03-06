import traverse from './traverse';

import type { Node } from '../patchers/types';

export default function containsSuperCall(node: Node) {
  let foundSuper = false;
  traverse(node, child => {
    if (foundSuper) {
      // Already found it, skip this one.
      return false;
    } else if (child.type === 'Super' || child.type === 'BareSuperFunctionApplication') {
      // Found it.
      foundSuper = true;
    } else if (child.type === 'Class') {
      // Don't go into other classes.
      return false;
    }
  });
  return foundSuper;
}
