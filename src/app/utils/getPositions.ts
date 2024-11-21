import { ItemPos, CategoryPos, SubcategoryPos } from "../redux/dragNdropSlice";
import styles from "@/app/css/restaurant-creator-page.module.css"
/**
 * Gets all the item elements of the menu and returns a array with its top and bottom positions
 * @param arrayOfElements 
 * @returns 
 */
export const getAllItemPositions = (arrayOfElements:HTMLElement[]) => {
    
    let lastCategory: HTMLElement | null = null;
    let lastSubcategory: HTMLElement | null = null;
  
    let currentCategoryIndex = -1;
    let currentSubcategoryIndex = -1;
    let currentItemIndex = -1;
  
    const positionArr: ItemPos[] = arrayOfElements.map((element) => {
      const rect = element.getBoundingClientRect();
  
      // Find the closest Subcategory and Category elements
      const subcategory = element.closest(`.${styles.subcategoryEditorContainer}`) as HTMLElement | null;
      const category = subcategory?.closest(`.${styles.categoryEditorContainer}`) as HTMLElement | null;
  
      // Update category index if it's a new category
      if (category !== lastCategory) {
        currentCategoryIndex++;
        lastCategory = category;
        currentSubcategoryIndex = -1; // Reset subcategory index for the new category
      }
  
      // Update subcategory index if it's a new subcategory
      if (subcategory !== lastSubcategory) {
        currentSubcategoryIndex++;
        lastSubcategory = subcategory;
        currentItemIndex = -1; // Reset item index for the new subcategory
      }
  
      // Increment item index for each new item within the subcategory
      currentItemIndex++;
  
      return {
        categoryArrayPosition: currentCategoryIndex,
        subcategoryArrayPosition: currentSubcategoryIndex,
        itemArrayPosition: currentItemIndex,
        itemTopPosition: rect.top,
        itemBottomPosition: rect.bottom,
      };
    });
  
    console.log('Items:')
    console.table(positionArr);
    return positionArr;
  };

  /**
     * Gets all the subcategory elements and returns an array with their top and bottom positions
     * grouped by categories
     * @param arrayOfSubcategories 
     * @returns 
   */
export const getAllSubcategoryPositions = (arrayOfSubcategories: HTMLElement[]) => {
        let lastCategory: HTMLElement | null = null;
        let currentCategoryIndex = -1;
        let currentSubcategoryIndex = -1;
      
        const subCatpositionArr: SubcategoryPos[] = arrayOfSubcategories.map((subcategory) => {
          const rect = subcategory.getBoundingClientRect();
      
          // Find the closest Category element
          const category = subcategory.closest(`.${styles.categoryEditorContainer}`) as HTMLElement | null;
      
          // Update category index if it's a new category
          if (category !== lastCategory) {
            currentCategoryIndex++;
            lastCategory = category;
            currentSubcategoryIndex = -1; // Reset subcategory index for the new category
          }
      
          // Increment subcategory index for each new subcategory within the category
          currentSubcategoryIndex++;
      
          return {
            categoryArrayPosition: currentCategoryIndex,
            subcategoryArrayPosition: currentSubcategoryIndex,
            subcategoryTopPosition: rect.top,
            subcategoryBottomPosition: rect.bottom,
          };
        });
      
        console.log('Subcategories:')
        console.table(subCatpositionArr)
        return subCatpositionArr;
      };
      

/**
   * Gets all the category elements and returns an array with their top and bottom positions
   * @param arrayOfCategories 
   * @returns 
 */
export const getAllCategoryPositions = (arrayOfCategories: HTMLElement[]) => {

    const catPositionArr: CategoryPos[] = arrayOfCategories.map((category, index) => {
      const rect = category.getBoundingClientRect();
  
      return {
        categoryArrayPosition: index,
        categoryTopPosition: rect.top,
        categoryBottomPosition: rect.bottom,
      };
    });
    console.log('Categories:')
    console.table(catPositionArr);
    return catPositionArr;

  };

  export const currentDragingItemPosition = () =>{
    
  }
  
