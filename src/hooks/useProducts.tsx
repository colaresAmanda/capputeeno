'use client'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosPromise } from 'axios'

import { ProductsFetchResponse } from '@/types/ProductsResponse'
import { useFilter } from './useFilter'
import { FilterType } from '@/types/filter-types'
import { getCategoryByType, getFiedByPriority } from '@/utils/graphql-filters'
import { PriorityTypes } from '@/types/priority-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL as string
const fetcher = (query: string): AxiosPromise<ProductsFetchResponse> => {
  return axios.post(API_URL, {
    query,
  })
}

const mountQuery = (type: FilterType, priority: PriorityTypes) => {
  if (type === FilterType.ALL && priority === PriorityTypes.POPULARITY)
    return `query {
        allProducts(){
          id
          name
          price_in_cents
          image_url
        }
      }
    `

  return `query {
        allProducts(filter: {category: "${getCategoryByType(type)}"}, sortField: "${getFiedByPriority(priority)}"){
          id
          name
          price_in_cents
          image_url
        }
      }
    `
}
export function useProducts() {
  const { type, priority } = useFilter()
  const query = mountQuery(type, priority)
  const { data } = useQuery({
    queryFn: () => fetcher(query),
    queryKey: ['products', type],
  })

  return {
    data: data?.data?.data?.allProducts,
  }
}
