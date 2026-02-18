
import { FactorNode } from '../types';

export const isPrime = (n: number): boolean => {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
};

export const generateId = (): string => Math.random().toString(36).substr(2, 9);

// 고유한 숫자별 파스텔 색상 매핑
const colorPalette = [
  '#d4e6b5', // 연두
  '#bfd3ed', // 하늘
  '#fef08a', // 노랑
  '#fed7aa', // 주황
  '#fecaca', // 분홍
  '#e9d5ff', // 보라
  '#99f6e4', // 민트
  '#c7d2fe', // 인디고
  '#fecdd3', // 로즈
  '#ecfccb', // 라임
  '#ccfbf1', // 틸
  '#fae8ff', // 푸시아
  '#dcfce7', // 그린
  '#eff6ff', // 블루
  '#fff7ed', // 오렌지
];

export const getColorForNumber = (n: number): string => {
  if (!isPrime(n)) return 'transparent';
  // 숫자를 기반으로 인덱스 생성 (소수 리스트에서의 순서 활용 가능)
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
  const index = primes.indexOf(n);
  if (index !== -1) return colorPalette[index % colorPalette.length];
  
  // 리스트에 없는 큰 소수의 경우 해시 처리
  return colorPalette[n % colorPalette.length];
};

export const checkDecomposed = (node: FactorNode | null): boolean => {
  if (!node) return false;
  // 리프 노드인 경우
  if (!node.left && !node.right) {
    return node.isPrime;
  }
  // 자식 노드가 있는 경우 두 자식 모두 완료되어야 함
  return checkDecomposed(node.left || null) && checkDecomposed(node.right || null);
};

export const getPrimeFactors = (node: FactorNode | null): number[] => {
  if (!node) return [];
  // 리프 노드인 경우만 수집
  if (!node.left && !node.right) {
    return [node.value];
  }
  // 자식 노드가 있는 경우 하위 노드에서 수집하여 정렬
  return [
    ...getPrimeFactors(node.left || null),
    ...getPrimeFactors(node.right || null)
  ].sort((a, b) => a - b);
};
