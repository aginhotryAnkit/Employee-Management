import 'dotenv/config';
import app from './app';
import sequelize from './config/database';

const PORT = process.env.PORT || 3000;

const start = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✔ Database connected');
    app.listen(PORT, () => console.log(`✔ Server running on port ${PORT}`));
  } catch (err: any) {
    console.error('✘ Failed to start server:', err.message);
    process.exit(1);
  }
};

start();
