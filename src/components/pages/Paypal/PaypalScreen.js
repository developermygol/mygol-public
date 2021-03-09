import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { startLoadOrganization } from '../../../store/actions/organizations';
import { getPaymentGetawayType } from '../../../store/actions/paypal';
import { Localize, LocalizeI } from '../../common/Locale/Loc';
import { getUploadsIcon } from '../../helpers/Utils';

import './Paypal.css';

const PaypalScreen = () => {
  const dispatch = useDispatch();
  const { activeOrganization } = useSelector(state => state.organizations);
  const [paypalConfig, setPaypalConfig] = useState(null);
  let { amount } = useParams();

  useEffect(() => {
    const loadData = async () => {
      const config = await getPaymentGetawayType();
      await dispatch(startLoadOrganization());
      setPaypalConfig(config);
    };

    loadData();
  }, []);

  if (!paypalConfig) return null;

  return (
    <div className="PaypalScreen">
      <div className="Details">
        <div
          className="Logo"
          style={{
            backgroundImage: `url('${getUploadsIcon(
              activeOrganization.logoImgUrl,
              activeOrganization.id,
              'org'
            )}')`,
          }}
        />

        <h4>{LocalizeI('Paypal.Info.Text', [activeOrganization.name])}</h4>
        <h1>
          <strong>
            {amount} <span>{paypalConfig.paymentCurrency.toUpperCase()}</span>
          </strong>
        </h1>
        <h4>{Localize('Paypal.Payment.Text')}</h4>
      </div>

      <PayPalButton
        amount={amount}
        onSuccess={async (details, data) => {
          window.location.replace(`../paypal/success/${data.orderID}`);
        }}
        options={{
          clientId: paypalConfig.paymentKeyPublic,
          currency: paypalConfig.paymentCurrency.toUpperCase(),
        }}
      />
    </div>
  );
};

export default PaypalScreen;
