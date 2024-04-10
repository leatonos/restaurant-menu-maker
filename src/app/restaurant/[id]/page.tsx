import { getRestaurant } from '@/app/server-actions/get-restaurant';
import { Suspense } from 'react';
import { RestaurantMenu } from '@/app/types/types';
import MenuView from '@/app/components/menu-view-components/menu-view';


export default async function Restaurant({ params }: { params: { id: string } }) {

    async function getRestaurantData(id:string) {
        const APIRequest = await getRestaurant(params.id)
        const result = await APIRequest.json()
        const restaurantData = result as RestaurantMenu
        return restaurantData
    }

    const restaurantData = await getRestaurantData(params.id)

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <MenuView restaurantInfo={restaurantData}/>
            </Suspense>
        </div>
        )
  }