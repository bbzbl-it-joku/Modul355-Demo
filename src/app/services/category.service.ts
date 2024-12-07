import { Injectable } from '@angular/core';
import getSupabase from './supabase.service';
import { Category } from '../data/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private supabase = getSupabase();

  constructor() { }

  mapCategory(category: any): Category {
    return {
      id: category.id,
      name: category.name,
      createdAt: category.created_at,
    };
  }

  async getCategories(): Promise<Category[]> {
    const { data, error } = await this.supabase.from('categories').select('*');
    if (error) {
      throw error;
    }
    return data.map(this.mapCategory);
  }

  async createCategory(categoryName: String) {
    const { error } = await this.supabase.from('categories').insert({ id: undefined, name: categoryName, created_at: undefined }).single();
    if (error) {
      throw error;
    }
  }

  async updateCategory(category: Category) {
    const { error } = await this.supabase.from('categories').update({ id: category.id, name: category.name, created_at: category.createdAt }).match({ id: category.id }).single();
    if (error) {
      throw error;
    }
  }

  async deleteCategory(category: Category) {
    const { error } = await this.supabase.from('categories').delete().match({ id: category.id });
    if (error) {
      throw error;
    }
  }
}


