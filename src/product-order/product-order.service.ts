import * as moment from 'moment';
import {
  Injectable,
  HttpStatus,
  UploadedFile,
  Res,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './models/order/order.entity';
import { Repository, getRepository } from 'typeorm';
import { OrderDetail } from './models/order-detail/order-detail.entity';
import { FoodAndBev } from 'src/product-data/models/food-and-bev/food-and-bev.entity';
import { Electronic } from 'src/product-data/models/electronic/electronic.entity';
import { Furniture } from 'src/product-data/models/furniture/furniture.entity';
import { SellerOrder } from './models/seller-order/seller-order.entity';
import { Tile } from 'src/product-data/models/tile/tile.entity';
import { Address } from 'src/user-data/models/address/address.entity';

@Injectable()
export class ProductOrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(SellerOrder)
    private sellerOrderRepository: Repository<SellerOrder>,
  ) {}

  async insertProductOrder(order: Order) {
    const selectOrder1 = await this.getProductOrderByUuid(order.uuid);
    if (selectOrder1.length > 0) {
      var orderDetail = new OrderDetail();
      orderDetail = order.orderDetail[0];
      orderDetail.orderId = selectOrder1[0].orderId;
      const orderDetailIsExist = await this.orderDetailRepository.find({
        where: {
          orderId: orderDetail.orderId,
          productId: orderDetail.productId,
        },
      });
      if (orderDetailIsExist.length > 0) {
        if (orderDetail.quantity != null)
          orderDetailIsExist[0].quantity += orderDetail.quantity;
        else orderDetailIsExist[0].quantity++;
        await this.orderDetailRepository.save(orderDetailIsExist);
      } else {
        await this.orderDetailRepository.save(orderDetail);
      }
      var x = this.updateProductOrderPrice(selectOrder1[0].orderId);
    } else if (selectOrder1.length == 0) {
      const insertOrder = await this.orderRepository.save(order);
      var orderDetail = new OrderDetail();
      orderDetail = order.orderDetail[0];
      orderDetail.orderId = insertOrder.orderId;
      await this.orderDetailRepository.save(orderDetail);
      this.updateProductOrderPrice(insertOrder.orderId);
    }
  }

  async getProductOrderByUuid(uuid): Promise<any[]> {
    const selectProductOrder = await this.orderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.orderDetail', 'orderDetail')
      .innerJoinAndSelect('orderDetail.product', 'product')
      .where('order.uuid = :uuid', { uuid: uuid })
      .andWhere('order.orderStatus = 0')
      .getMany();
    return selectProductOrder;
  }

  async getAllProductOrderByUuid(uuid): Promise<any[]> {
    const selectProductOrder = await this.orderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.orderDetail', 'orderDetail')
      .innerJoinAndSelect('orderDetail.product', 'product')
      .where('order.uuid = :uuid', { uuid: uuid })
      .andWhere('order.orderStatus != 0')
      .orderBy('order.orderDateTime', 'DESC')
      .getMany();
    return selectProductOrder;
  }

  async getProductOrderByOrderId(orderId): Promise<any[]> {
    const selectProductOrder = await this.orderRepository
      .createQueryBuilder('order')
      // .select("DATE_FORMAT(order.orderDateTime,'%d/%m%Y') as orderDateTime")
      // .select("order.orderDateTime")
      .leftJoinAndSelect('order.orderDetail', 'orderDetail')
      .leftJoinAndSelect('orderDetail.product', 'product')
      .where('order.orderId = :orderId', { orderId: orderId })
      .getMany();
    selectProductOrder[0].orderDateTime = moment(
      selectProductOrder[0].orderDateTime,
    ).format('DD-MM-YYYY');
    return selectProductOrder;
  }

  async increaseOrderDetailQuantity(orderDetail: OrderDetail) {
    const orderDetailData = await this.orderDetailRepository.find(orderDetail);
    orderDetail.quantity = orderDetailData[0].quantity + 1;
    await this.orderDetailRepository.save(orderDetail);
    this.updateProductOrderPrice(orderDetail.orderId);
  }

  async decreaseOrderDetailQuantity(orderDetail: OrderDetail) {
    const orderDetailData = await this.orderDetailRepository.find(orderDetail);
    orderDetail.quantity = orderDetailData[0].quantity - 1;
    await this.orderDetailRepository.save(orderDetail);
    this.updateProductOrderPrice(orderDetail.orderId);
  }

  async removeOrderDetailProductId(orderDetail: OrderDetail) {
    console.log(orderDetail);
    const orderDetailData = await this.orderDetailRepository
      .createQueryBuilder('orderDetail')
      .delete()
      .where('order_detail.productId = :productId', {
        productId: orderDetail.productId,
      })
      .andWhere('order_detail.orderId = :orderId', {
        orderId: orderDetail.orderId,
      })
      .execute();
    const orderData = await this.getProductOrderByOrderId(orderDetail.orderId);
    if (orderData[0].orderDetail.length == 0) {
      await this.removeOrder(orderDetail);
    } else await this.updateProductOrderPrice(orderDetail.orderId);
  }

  async removeOrder(orderDetail: OrderDetail) {
    const orderDetailData = await this.orderRepository
      .createQueryBuilder('order')
      .delete()
      .where('order.orderId = :orderId', {
        orderId: orderDetail.orderId,
      })
      .execute();
  }

  async updateProductOrderPrice(orderId) {
    var totalPrice = 0;
    const selectOrder = await this.getProductOrderByOrderId(orderId);
    for (var i = 0; i < selectOrder[0].orderDetail.length; i++) {
      const selectProductOrderDetail = await this.orderDetailRepository.find({
        relations: ['product'],
        where: {
          orderId: selectOrder[0].orderDetail[i].orderId,
          productId: selectOrder[0].orderDetail[i].productId,
        },
      });

      const categoryId = selectProductOrderDetail[0].product.categoryId;
      if (categoryId == 1) {
        const foodAndBevData = await getRepository(FoodAndBev).find({
          where: {
            foodAndBevId: selectProductOrderDetail[0].product.productId,
          },
        });
        console.log('each Price ' + foodAndBevData[0].foodAndBevPrice);
        var totalFoodAndBevPrice =
          foodAndBevData[0].foodAndBevPrice *
          selectProductOrderDetail[0].quantity;
        totalPrice += totalFoodAndBevPrice;
        console.log('Food Price ' + totalFoodAndBevPrice);
      } else if (categoryId == 2) {
        const electronicData = await getRepository(Electronic).find({
          where: {
            electronicId: selectProductOrderDetail[0].product.productId,
          },
        });
        console.log('each Price ' + electronicData[0].electronicPrice);
        var totalElectronicPrice =
          electronicData[0].electronicPrice *
          selectProductOrderDetail[0].quantity;
        totalPrice += totalElectronicPrice;
        console.log('Electronic Price ' + totalElectronicPrice);
      } else if (categoryId == 3) {
        const furnitureData = await getRepository(Furniture).find({
          where: {
            furnitureId: selectProductOrderDetail[0].product.productId,
          },
        });
        console.log('each Price ' + furnitureData[0].furniturePrice);
        var totalFurniturePrice =
          furnitureData[0].furniturePrice *
          selectProductOrderDetail[0].quantity;
        totalPrice += totalFurniturePrice;
        console.log('Furniture Price ' + totalFurniturePrice);
      } else if (categoryId == 4) {
        const tileData = await getRepository(Tile).find({
          where: {
            tileId: selectProductOrderDetail[0].product.productId,
          },
        });
        console.log('each Price ' + tileData[0].tilePrice);
        var totalTilePrice =
          tileData[0].tilePrice * selectProductOrderDetail[0].quantity;
        totalPrice += totalTilePrice;
        console.log('Tile Price ' + totalTilePrice);
      }
    }
    const selectProductOrder = await this.orderRepository.find({
      where: {
        orderId: selectOrder[0].orderId,
      },
    });
    var updateOrder = new Order();
    updateOrder = selectProductOrder[0];
    updateOrder.totalPrice = totalPrice;
    console.log('totalPrice : ' + totalPrice);
    console.log('update Total : ' + updateOrder.totalPrice);
    await this.orderRepository.save(updateOrder);
  }

  async checkoutProductOrder(order: Order) {
    console.log(order);
    const orderList = await this.orderRepository.find({
      where: {
        orderId: order.orderId,
      },
    });

    var saveOrder = orderList[0];
    console.log(saveOrder);
    // saveOrder.orderDateTime = null
    saveOrder.orderStatus = 1;
    saveOrder.addressId = order.addressId;
    await this.orderRepository.save(saveOrder);
  }

  async confirmProductOrder(order: Order) {
    const orderList = await this.orderRepository.find({
      where: {
        orderId: order.orderId,
      },
    });
    var saveOrder = orderList[0];
    saveOrder.orderStatus = 2;
    saveOrder.orderDateTime = orderList[0].orderDateTime;
    return await this.orderRepository.save(saveOrder);
  }

  async assignSellerOrder(sellerOrder: SellerOrder) {
    console.log(sellerOrder);
    sellerOrder.assignDate = new Date(Date.now());
    await this.sellerOrderRepository.save(sellerOrder);

    var data = await this.orderRepository.findOne({
      where: {
        orderId: sellerOrder.orderId,
      },
    });
    data.orderStatus = 2;
    await this.orderRepository.save(data);
  }

  async getSellerOrderList(selleruuid) {
    // const sellerOrderList = this.sellerOrderRepository.find({
    //   where: {
    //     sellerUuid: selleruuid,
    //     sellerOrderStatus: 0,
    //   },
    // });
    const sellerOrderList = this.sellerOrderRepository
      .createQueryBuilder('sellerOrder')
      .innerJoinAndSelect('sellerOrder.order', 'order')
      .innerJoinAndMapOne(
        'order.address',
        Address,
        'address',
        'order.addressId = address.addressId',
      )
      .where('sellerOrder.sellerUuid = :selleruuid', { selleruuid: selleruuid })
      .andWhere('sellerOrder.sellerOrderStatus = 0')
      .orderBy('sellerOrder.assignDate', 'ASC')
      .getMany();
    return sellerOrderList;
  }
  async signatureUpload(@UploadedFile() file, sellerOrder: SellerOrder) {
    console.log(file);
    console.log(sellerOrder);
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    const sellerOrderData = await this.sellerOrderRepository.findOne({
      where: {
        orderId: sellerOrder.orderId,
      },
    });
    sellerOrderData.sellerOrderSignatureImage = response.filename;
    await this.sellerOrderRepository.save(sellerOrderData);
    await this.confirmSellerOrder(sellerOrder);
    return response;
  }
  // async signatureUpload(@UploadedFile() file) {
  //   console.log(file)
  //   const response = {
  //     originalname: file.originalname,
  //     filename: file.filename,
  //   };
  //   return response;
  // }

  async getSignature(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './signature' });
  }

  async confirmSellerOrder(sellerOrder: SellerOrder) {
    const data = await this.sellerOrderRepository.findOne({
      where: {
        orderId: sellerOrder.orderId,
      },
    });
    data.finishDate = new Date(Date.now());
    data.sellerOrderStatus = 1;

    const orderData = await this.orderRepository.findOne({
      where: {
        orderId: sellerOrder.orderId,
      },
    });
    orderData.orderStatus = 3;

    await this.sellerOrderRepository.save(data);
    await this.orderRepository.save(orderData);
  }
}
