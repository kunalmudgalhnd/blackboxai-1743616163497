const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('config');
const User = require('./models/User');
const Product = require('./models/Product');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@groozo.com',
      password: 'admin123',
      role: 'admin'
    });

    const salt = await bcrypt.genSalt(10);
    adminUser.password = await bcrypt.hash(adminUser.password, salt);
    await adminUser.save();

    // Create sample products
    const sampleProducts = [
      {
        name: 'Fresh Apples',
        price: 2.99,
        description: 'Crisp and juicy organic apples',
        category: 'fruits',
        imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
        stock: 50,
        rating: 4.5
      },
      {
        name: 'Organic Bananas',
        price: 1.49,
        description: 'Naturally sweet and creamy bananas',
        category: 'fruits',
        imageUrl: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg',
        stock: 30,
        rating: 4.2
      },
      {
        name: 'Whole Wheat Bread',
        price: 3.29,
        description: 'Freshly baked whole wheat bread',
        category: 'bakery',
        imageUrl: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
        stock: 20,
        rating: 4.0
      },
      {
        name: 'Organic Milk',
        price: 4.99,
        description: 'Fresh organic milk from grass-fed cows',
        category: 'dairy',
        imageUrl: 'https://images.pexels.com/photos/221083/pexels-photo-221083.jpeg',
        stock: 25,
        rating: 4.7
      },
      {
        name: 'Free Range Eggs',
        price: 5.49,
        description: 'Farm fresh free range eggs',
        category: 'dairy',
        imageUrl: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg',
        stock: 40,
        rating: 4.3
      },
      {
        name: 'Fresh Spinach',
        price: 2.29,
        description: 'Organic baby spinach leaves',
        category: 'vegetables',
        imageUrl: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg',
        stock: 15,
        rating: 4.1
      }
    ];

    await Product.insertMany(sampleProducts);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();