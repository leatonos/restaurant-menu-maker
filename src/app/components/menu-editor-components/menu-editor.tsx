"use client"
import Image from "next/image";
import styles from "@/app/css/restaurant-creator-page.module.css"
import { redirect } from  'next/navigation';
import React, { useEffect, useState } from 'react'

// Redux Imports
import type { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { createNewCategory, setInitialData} from '@/app/redux/menuCreatorSlice'
import { RestaurantMenu } from "@/app/types/types";

//Components
import CategoryEditor from "./category-editor";
import MenuStyleEditor from "./menu-style-editor";
import MenuDetailsEditor from "./menu-details-editor";
import UserGallery from "../user-components/user-gallery";

//Images
import AddImage from '../../../../public/add.svg'
import SaveIcon from '../../../../public/save.svg'
import RightArrowImage from '../../../../public/arrow-right.svg'
import PreviewImage from '../../../../public/preview.svg'
import { dragNdropSlice } from "@/app/redux/dragNdropSlice";

export default function MenuEditor(props:{initialData:RestaurantMenu}) {

    const restaurantMenuData = useSelector((state: RootState) => state.restaurantCreator)
    const galleryState = useSelector((state: RootState)=> state.restaurantCreator.galleryState)
    const grabNDropDataMouse = useSelector((state: RootState)=>state.dragNdrop.mouse)
    const itemPositions =  useSelector((state: RootState)=>state.dragNdrop.itemPositions)
    const subcatPositions =  useSelector((state: RootState)=>state.dragNdrop.subCategoriesPositions)
    //Delete this variables later
    const subcategoryCurrentPos = useSelector((state:RootState)=>state.dragNdrop.currentPositionSubcatArrPosition)
    const subcategoryItemPos = useSelector((state:RootState)=>state.dragNdrop.currentPositionItemArrPosition)

    const dispatch = useDispatch()
    const menuCategories = restaurantMenuData.restaurantMenu.menuCategories
    
    const [savingStatus,setSavingState] = useState<string>('Save Changes')
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
   

    //Gets the saved data from the database and stores it into the Redux store
    useEffect(()=>{
      dispatch(setInitialData(props.initialData))
    },[])

    /**
     * Saves changes into the database
     * @param updatedRestaurant 
     */
    const saveChanges = async(updatedRestaurant:RestaurantMenu)=>{
      setSavingState('Saving...')
      try {
        const response = await fetch('/api/update-restaurant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRestaurant),
        });
        if (!response.ok) {
            throw new Error('Failed to update restaurant');
        }else{
          const newRestaurantId = await response.json()
          console.log(newRestaurantId.newRestaurantId)
          //router.push(`/user/restaurant-creator/${newRestaurantId.newRestaurantId}`)
        }
        // Handle success response
        console.log('Restaurant created successfully');
        setSavingState('Save Changes')
    } catch (error) {
        console.error('Error updating restaurant restaurant:', error);
    }
  
  
    }

    const toggleSideOptions = () =>{
      setIsMenuVisible(!isMenuVisible);
    }

    function GalleryModal(){
      if(galleryState.changeReference){
        return(
          <div className={styles.galleryBackgroundContainer}>
            <div className={styles.galleryContainer}>
              <UserGallery ownerId={props.initialData.ownerId} selectingImage={true} />
            </div>
        </div>
        )
      } 
    }

  return (
    <> 
    <GalleryModal/>
    <div className={styles.editorContainer}>
      <div className={`${styles.infoEditorContainer} ${isMenuVisible ? styles.visible : styles.hidden}`}>
        <div className={styles.restaurantInfoEditor}>
          <MenuDetailsEditor/>
          <MenuStyleEditor initialStyle={props.initialData.menuStyle} />
          <div className={styles.buttons}>
            <button className={styles.previewButton}>
              <Image className={styles.createIcon} src={PreviewImage} alt={"Preview menu"} />
              <a target="_blank" href={`https://menufactory.org/restaurant/${restaurantMenuData.restaurantMenu._id}`}>
                Preview menu
              </a>
            </button>
            <button onClick={()=>saveChanges(restaurantMenuData.restaurantMenu)} className={styles.saveButton}>
              <Image className={styles.createIcon} src={SaveIcon} alt={"Save changes button"} />
                {savingStatus}
            </button>
          </div>
        </div>
        <div className={styles.sideTab}>
            <Image className={`${styles.leftArrowIcon} ${isMenuVisible ? styles.hide : styles.show}`}
              src={RightArrowImage} alt={'Open Options'} onClick={toggleSideOptions}
            />
        </div>
      </div>
      <div className={styles.categoriesContainer}>
        <div className={styles.createNewCategoryBox}>
          <button onClick={()=>dispatch(createNewCategory())} className={styles.createButton}>
            <Image className={styles.createIcon} src={AddImage} alt={"Create new category button"} />
            Create new Category
          </button>
        </div>
        {menuCategories.map((category, index)=>{
          return <CategoryEditor key={index} category={category} index={index}/>
        }
        )}
        <button onClick={()=>saveChanges(restaurantMenuData.restaurantMenu)} className={styles.saveButtonMobile}>
          <Image className={styles.createIcon} src={SaveIcon} alt={"Save changes button"} />
            {savingStatus}
        </button>
      </div>
    </div>
    </>
  );
} 