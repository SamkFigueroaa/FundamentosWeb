import { Router } from 'express';
import {
  annulSale,
  createSale,
  getSale,
  listSales,
  listSaleDetails,
  replaceSale,
  updateSale,
} from '../controllers/ventas.controller.js';

const router = Router();

// IMPORTANTE: Ponemos la ruta '/detalles' ANTES de las rutas que usan '/:id'
router.get('/detalles', listSaleDetails);

router.get('/', listSales);
router.get('/:id', getSale);
router.post('/', createSale);
router.put('/:id', replaceSale);
router.patch('/:id', updateSale);
router.patch('/:id/anular', annulSale);

export default router;