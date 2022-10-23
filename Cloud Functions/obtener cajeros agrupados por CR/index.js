/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

  const {BigQuery} = require('@google-cloud/bigquery');
  const bigquery = new BigQuery();


exports.getAtm = async (req, res) => {

   const query = 'SELECT CR, Sitio, Calle, Num__Ext_, Estado, Ciudad, CP, Colonia, Latitud, Longitud, count(CR) as totalAtm FROM `bbva-latam-hack22mex-5008.atm.atms` group by CR ,Sitio, Calle, Num__Ext_, Estado, Ciudad, CP, Colonia, Latitud, Longitud order by totalAtm desc';
    const options = {
      query: query,
      location: 'US',
    };

    const [job] = await bigquery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);

    const [rows] = await job.getQueryResults();
    console.log('Rows:');
    rows.forEach(row => console.log(row));


  let message = req.query.message || req.body.message || rows;
  res.status(200).send(message);
};
