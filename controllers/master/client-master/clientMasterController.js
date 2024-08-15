const { connectDatabase } = require('../../../config/dbconfig');
const sql = require('mssql');

// Create a new client pickup point
const createClientPickupPoint = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const {
      clcode, shpcomp, shpname, addr1, addr2, city, pincode, contactno, emailid
    } = req.body;

    const insertQuery = `
      INSERT INTO dbo.jbl_clientpickup (
        clcode, shpcomp, shpname, addr1, addr2, city, pincode, contactno, emailid
      ) VALUES (
        @clcode, UPPER(@shpcomp), UPPER(@shpname), UPPER(@addr1), UPPER(@addr2),
        UPPER(@city), @pincode, @contactno, @emailid
      );
    `;

    await pool.request()
      .input('clcode', sql.VarChar, clcode)
      .input('shpcomp', sql.VarChar, shpcomp)
      .input('shpname', sql.VarChar, shpname)
      .input('addr1', sql.VarChar, addr1)
      .input('addr2', sql.VarChar, addr2)
      .input('city', sql.VarChar, city)
      .input('pincode', sql.VarChar, pincode)
      .input('contactno', sql.VarChar, contactno)
      .input('emailid', sql.VarChar, emailid)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'Client pickup point created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating client pickup point', error });
  }
};
// Delete a client pickup point by clcode
const deleteClientPickupPoint = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { clcode } = req.params;

    const deleteQuery = `
      DELETE FROM dbo.jbl_clientpickup
      WHERE clcode = @clcode;
    `;

    const result = await pool.request()
      .input('clcode', sql.VarChar, clcode)
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Client pickup point deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Client pickup point not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting client pickup point', error });
  }
};


const getClientPickupAddressData = async (req,res) =>{
  try {
    const pool = await connectDatabase();
    const selectQuery= 'select * from dbo.jbl_conpickupaddress';
    const result=await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, clientPickupAddress: result.recordset });
  }catch(error){
console.error(error);
res.status(500).json({ statusCode: 500, message: 'Error getting clients pickup address data', error });
  }
}


// Create a new client pickup point
const createClientDeliveryPoint = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const {
      clcode, shpcomp, shpname, addr1, addr2, city, pincode, contactno, emailid
    } = req.body;

    const insertQuery = `
      INSERT INTO dbo.jbl_ConsigneeMaster (
        clcode, shpcomp, shpname, addr1, addr2, city, pincode, contactno, emailid
      ) VALUES (
        @clcode, UPPER(@shpcomp), UPPER(@shpname), UPPER(@addr1), UPPER(@addr2),
        UPPER(@city), @pincode, @contactno, @emailid
      );
    `;

    await pool.request()
      .input('clcode', sql.VarChar, clcode)
      .input('shpcomp', sql.VarChar, shpcomp)
      .input('shpname', sql.VarChar, shpname)
      .input('addr1', sql.VarChar, addr1)
      .input('addr2', sql.VarChar, addr2)
      .input('city', sql.VarChar, city)
      .input('pincode', sql.VarChar, pincode)
      .input('contactno', sql.VarChar, contactno)
      .input('emailid', sql.VarChar, emailid)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'Client delivery point created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating client delivery point', error });
  }
};
// Delete a client pickup point by clcode
const deleteClientDeliveryPoint = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { clcode } = req.params;

    const deleteQuery = `
      DELETE FROM dbo.jbl_ConsigneeMaster
      WHERE clcode = @clcode;
    `;

    const result = await pool.request()
      .input('clcode', sql.VarChar, clcode)
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Client delivery  deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Client delivery  not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting client delivery ', error });
  }
};

const getClientDeliveryAddressData = async (req,res) =>{
  try {
    const pool = await connectDatabase();
    const selectQuery= 'select * from dbo.jbl_ConsigneeMaster';
    const result=await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, clientDeliveryAddress: result.recordset });
  }catch(error){
console.error(error);
res.status(500).json({ statusCode: 500, message: 'Error getting clients delivery address data', error });
  }
}



//fuel master 
const createFuelMaster = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const {
      clcode, network, fuel, edate
    } = req.body;

    const insertQuery = `
      INSERT INTO dbo.jbl_networkfuel (
        clcode, network, fuel, edate
      ) VALUES (
        @clcode, @network, @fuel, @edate
      );
    `;

    await pool.request()
      .input('clcode', sql.VarChar, clcode)
      .input('network', sql.VarChar, network)
      .input('fuel', sql.Int, fuel)
      .input('edate', sql.Date, edate)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'fuel master created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating fuel master', error });
  }
};

const deleteFuelMaster = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { clcode } = req.params;

    const deleteQuery = `
      DELETE FROM dbo.jbl_networkfuel
      WHERE clcode = @clcode;
    `;

    const result = await pool.request()
      .input('clcode', sql.VarChar, clcode)
      .query(deleteQuery);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ statusCode: 200, message: 'Fuel master  deleted successfully' });
    } else {
      res.status(404).json({ statusCode: 404, message: 'Fuel master  not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting fuel master ', error });
  }
};

module.exports = { createClientPickupPoint, deleteClientPickupPoint, createClientDeliveryPoint, deleteClientDeliveryPoint, getClientPickupAddressData, getClientDeliveryAddressData, createFuelMaster, deleteFuelMaster};
