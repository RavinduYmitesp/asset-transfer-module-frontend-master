import './styles.scss';

import { Button, Col, Form, Row, Tag } from 'antd';

import CollapseComponent from '@/components/Collapse';
import { FC } from 'react';
import ModalComponent from '@/components/Modal';

interface Props {
  requestNumber: string;
  type: string;
  budgetType: string;
  fromLocation: string;
  toLocation: string;
  setVisible: () => void;
  items: Item[];
  floor?: string;
  building?: string;
}

interface Item {
  name: string;
  requestedAmount: number;
  selectedCbcNumbers: string[];
}

const ViewMiniStockModal: FC<Props> = ({
  toLocation,
  setVisible,
  items,
  floor,
  building,
  requestNumber,
}): JSX.Element => {
  return (
    <ModalComponent
      visible={true}
      onClose={setVisible}
      title='View Mini Stock Transfer'
      width={800}
    >
      <div className='ViewAssetTransferModal'>
        <div className='generate-view-asset-transfer-body'>
          <div className='asset-detail-items'>
            <div className='types'>
              <div className='asset-detail-type'>
                Request Id: <span>{requestNumber}</span>
              </div>
            </div>
            <div className='locations'>
              <div className='asset-detail-from-location'>
                From Location: <span>Head Office.Warehouse</span>
              </div>
              <div className='asset-detail-to-location'>
                To Location: <span>{toLocation}</span>
              </div>
            </div>
            <div className='locations'>
              {building && (
                <div className='asset-detail-from-location'>
                  Building: <span>{building}</span>
                </div>
              )}
              {floor && (
                <div className='asset-detail-to-location'>
                  floor: <span>{floor}</span>
                </div>
              )}
            </div>
          </div>
          <div className='asset-collapse'>
            <CollapseComponent
              items={[
                ...(items?.map(({ name, requestedAmount, selectedCbcNumbers }) => ({
                  header: `${name} | Requested: ${requestedAmount}`,
                  body: (
                    <Row>
                      <Col>
                        <Form.Item label='Selected CBC'>
                          {selectedCbcNumbers?.map((number) => (
                            <Tag className='selected-cbc-numbers' key={number} color='default'>
                              {number}
                            </Tag>
                          ))}
                        </Form.Item>
                      </Col>
                    </Row>
                  ),
                })) || []),
              ]}
            />
          </div>
          <Button className='close-button' onClick={setVisible}>
            Close
          </Button>
        </div>
      </div>
    </ModalComponent>
  );
};

export default ViewMiniStockModal;
