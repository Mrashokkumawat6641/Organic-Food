import {
    createOrderService,
    captureOrderService,
} from "../../services/sportsRegistrationService/paypalRegistration.service.js";
import { successResponse, errorResponse } from "../../../utils/response.js";

export const createOrder = async (req, res) => {
    // #swagger.tags = ['SportsAuth']
    // #swagger.summary = 'Create PayPal order'
    // #swagger.description = 'This endpoint creates a PayPal order for sports registration.'
    /*  #swagger.responses[200] = {
          description: 'Order created successfully',
          schema: {
              id: 'ORDER_ID'
          }
      } */
    try {
        const order = await createOrderService();
        successResponse(res, { id: order.id });
    } catch (error) {
        errorResponse(res, error.message, 500);
    }
};

export const captureOrder = async (req, res) => {
    // #swagger.tags = ['SportsAuth']
    // #swagger.summary = 'Capture PayPal order'
    // #swagger.description = 'This endpoint captures a PayPal order using the order ID.'
    /*  #swagger.parameters['orderID'] = {
          in: 'path',
          description: 'PayPal order ID',
          required: true,
          type: 'string'
      }
      #swagger.responses[200] = {
          description: 'Order captured successfully',
          schema: {
              status: 'COMPLETED'
          }
      } */
    const { orderID } = req.params;
    try {
        const data = await captureOrderService(orderID);
        successResponse(res, data);
    } catch (error) {
        errorResponse(res, error.message, 500);
    }
};
