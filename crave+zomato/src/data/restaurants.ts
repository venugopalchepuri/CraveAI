import { Restaurant } from '../context/RestaurantContext';

export const restaurants: Restaurant[] = [
  {
    id: 'rest1',
    name: 'Punjabi Tadka',
    cuisine: ['North Indian', 'Punjabi'],
    priceRange: 2,
    rating: 4.5,
    reviews: 1245,
    address: '123 Food Street, Andheri East',
    area: 'Andheri',
    image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    dishes: [
      {
        id: 'dish1',
        name: 'Butter Chicken',
        description: 'Tender chicken cooked in a rich tomato and butter gravy',
        price: 350,
        image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Main Course',
        isVegetarian: false,
        isSpicy: false,
        isPopular: true,
        moodTags: ['happy', 'relaxed', 'hungry'],
        weatherTags: ['rainy', 'cloudy', 'snowy']
      },
      {
        id: 'dish2',
        name: 'Paneer Tikka Masala',
        description: 'Grilled cottage cheese cubes in a spicy tomato gravy',
        price: 280,
        image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Main Course',
        isVegetarian: true,
        isSpicy: true,
        isPopular: true,
        moodTags: ['happy', 'hungry'],
        weatherTags: ['rainy', 'cloudy']
      },
      {
        id: 'dish3',
        name: 'Garlic Naan',
        description: 'Soft bread with garlic flavor, baked in tandoor',
        price: 60,
        image: 'https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Bread',
        isVegetarian: true,
        isSpicy: false,
        isPopular: false,
        moodTags: ['neutral', 'hungry'],
        weatherTags: ['sunny', 'cloudy', 'rainy']
      }
    ],
    openingHours: {
      open: '11:00',
      close: '23:00'
    },
    features: ['Outdoor Seating', 'Home Delivery', 'Takeaway']
  },
  {
    id: 'rest2',
    name: 'Wok & Roll',
    cuisine: ['Chinese', 'Thai', 'Asian'],
    priceRange: 2,
    rating: 4.2,
    reviews: 876,
    address: '45 Dragon Lane, Bandra West',
    area: 'Bandra',
    image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    dishes: [
      {
        id: 'dish4',
        name: 'Schezwan Noodles',
        description: 'Spicy noodles with vegetables in Schezwan sauce',
        price: 220,
        image: 'https://images.pexels.com/photos/1731535/pexels-photo-1731535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Main Course',
        isVegetarian: true,
        isSpicy: true,
        isPopular: true,
        moodTags: ['stressed', 'hungry'],
        weatherTags: ['rainy', 'cloudy']
      },
      {
        id: 'dish5',
        name: 'Kung Pao Chicken',
        description: 'Stir-fried chicken with peanuts, vegetables and chili peppers',
        price: 320,
        image: 'https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Main Course',
        isVegetarian: false,
        isSpicy: true,
        isPopular: true,
        moodTags: ['happy', 'stressed'],
        weatherTags: ['cloudy', 'rainy']
      }
    ],
    openingHours: {
      open: '12:00',
      close: '22:30'
    },
    features: ['Home Delivery', 'Takeaway', 'Indoor Seating']
  },
  {
    id: 'rest3',
    name: 'Pizza Paradise',
    cuisine: ['Italian', 'Continental'],
    priceRange: 3,
    rating: 4.7,
    reviews: 1532,
    address: '78 Cheese Street, Juhu',
    area: 'Juhu',
    image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    dishes: [
      {
        id: 'dish6',
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and basil',
        price: 350,
        image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Pizza',
        isVegetarian: true,
        isSpicy: false,
        isPopular: true,
        moodTags: ['happy', 'relaxed', 'sad'],
        weatherTags: ['rainy', 'cloudy']
      },
      {
        id: 'dish7',
        name: 'Pepperoni Pizza',
        description: 'Pizza topped with pepperoni slices and cheese',
        price: 450,
        image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Pizza',
        isVegetarian: false,
        isSpicy: false,
        isPopular: true,
        moodTags: ['happy', 'stressed', 'sad'],
        weatherTags: ['rainy', 'cloudy', 'snowy']
      }
    ],
    openingHours: {
      open: '11:30',
      close: '23:30'
    },
    features: ['Home Delivery', 'Takeaway', 'Indoor Seating', 'Outdoor Seating']
  },
  {
    id: 'rest4',
    name: 'South Spice',
    cuisine: ['South Indian', 'Kerala', 'Tamil'],
    priceRange: 1,
    rating: 4.3,
    reviews: 987,
    address: '23 Dosa Lane, Matunga',
    area: 'Matunga',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    dishes: [
      {
        id: 'dish8',
        name: 'Masala Dosa',
        description: 'Crispy rice crepe filled with spiced potato filling',
        price: 120,
        image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Breakfast',
        isVegetarian: true,
        isSpicy: true,
        isPopular: true,
        moodTags: ['happy', 'hungry', 'neutral'],
        weatherTags: ['rainy', 'cloudy', 'sunny']
      },
      {
        id: 'dish9',
        name: 'Idli Sambar',
        description: 'Steamed rice cakes served with lentil soup and chutney',
        price: 90,
        image: 'https://images.pexels.com/photos/4331489/pexels-photo-4331489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Breakfast',
        isVegetarian: true,
        isSpicy: false,
        isPopular: false,
        moodTags: ['relaxed', 'neutral'],
        weatherTags: ['rainy', 'cloudy']
      }
    ],
    openingHours: {
      open: '07:00',
      close: '22:00'
    },
    features: ['Home Delivery', 'Takeaway', 'Indoor Seating']
  },
  {
    id: 'rest5',
    name: 'Burger Barn',
    cuisine: ['American', 'Fast Food'],
    priceRange: 2,
    rating: 4.1,
    reviews: 756,
    address: '56 Patty Road, Lower Parel',
    area: 'Lower Parel',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    dishes: [
      {
        id: 'dish10',
        name: 'Classic Cheeseburger',
        description: 'Beef patty with cheese, lettuce, tomato, and special sauce',
        price: 250,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Burgers',
        isVegetarian: false,
        isSpicy: false,
        isPopular: true,
        moodTags: ['happy', 'stressed', 'sad'],
        weatherTags: ['sunny', 'cloudy']
      },
      {
        id: 'dish11',
        name: 'Veggie Burger',
        description: 'Plant-based patty with cheese and fresh vegetables',
        price: 220,
        image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Burgers',
        isVegetarian: true,
        isSpicy: false,
        isPopular: false,
        moodTags: ['happy', 'neutral'],
        weatherTags: ['sunny', 'cloudy']
      }
    ],
    openingHours: {
      open: '11:00',
      close: '23:00'
    },
    features: ['Home Delivery', 'Takeaway', 'Drive-through']
  },
  {
    id: 'rest6',
    name: 'Sushi Samurai',
    cuisine: ['Japanese', 'Sushi', 'Asian'],
    priceRange: 4,
    rating: 4.8,
    reviews: 632,
    address: '89 Wasabi Way, Worli',
    area: 'Worli',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    dishes: [
      {
        id: 'dish12',
        name: 'Salmon Nigiri (2 pcs)',
        description: 'Fresh salmon slices on pressed vinegared rice',
        price: 320,
        image: 'https://images.pexels.com/photos/2133989/pexels-photo-2133989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Sushi',
        isVegetarian: false,
        isSpicy: false,
        isPopular: true,
        moodTags: ['relaxed', 'neutral'],
        weatherTags: ['sunny', 'cloudy']
      },
      {
        id: 'dish13',
        name: 'California Roll (8 pcs)',
        description: 'Crab, avocado and cucumber roll with tobiko',
        price: 450,
        image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Sushi',
        isVegetarian: false,
        isSpicy: false,
        isPopular: true,
        moodTags: ['happy', 'relaxed'],
        weatherTags: ['sunny']
      }
    ],
    openingHours: {
      open: '12:30',
      close: '22:30'
    },
    features: ['Home Delivery', 'Indoor Seating', 'Takeaway']
  }
];