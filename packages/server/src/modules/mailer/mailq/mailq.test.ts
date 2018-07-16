import { Connection } from 'typeorm';
import * as faker from 'faker';

import { Mailq } from '../../../entity/Mailq';
import { TestClient } from '../../../utils/TestClient';
import { createTestConn } from '../../../testUtils/createTestConn';

faker.seed(Date.now() + 5);
const dtToProcess = new Date();
const fromName = 'rob';
const fromAddress = 'rob@robkurtz.net';
const toAddress = faker.internet.email();
const mailBody = '<div>testing 1 2 3</div>';

const client = new TestClient(process.env.TEST_HOST as string);

let conn: Connection;
beforeAll(async () => {
  conn = await createTestConn();
});
afterAll(async () => {
  conn.close();
});

describe('MailQ', async () => {
  it('can retrieve mailQs', async () => {
    // make sure we can register a user
    const response = await client.allMailQs();
    console.log('allmail response', response);
    // expect(response.data.me).toBeNull();
    // expect(response.data).toEqual({ register: null });
    Mailq.insert({
      dtToProcess,
      fromName,
      fromAddress,
      toAddress,
      mailBody
    });

    const mailqs = await Mailq.find({ order: { dtToProcess: 'DESC' } });
    expect(mailqs).toHaveLength(1);
    console.log('allmail response', mailqs);

    // const user = users[0];
    // expect(user.email).toEqual(email);
    // expect(user.password).not.toEqual(password);

    // const response2 = await client.register(email, password);
    // expect(response2.data.register).toHaveLength(1);
    // expect(response2.data.register[0]).toEqual({
    //   path: "email",
    //   message: duplicateEmail
    // });
  });

  // it("check bad password", async () => {
  //   // catch bad password
  //   const response4 = await client.register(faker.internet.email(), "ad");
  //   expect(response4.data).toEqual({
  //     register: [
  //       {
  //         path: "password",
  //         message: passwordNotLongEnough
  //       }
  //     ]
  //   });
  // });

  // it("check bad password and bad email", async () => {
  //   const response5 = await client.register("df", "ad");
  //   expect(response5.data).toEqual({
  //     register: [
  //       {
  //         path: "email",
  //         message: emailNotLongEnough
  //       },
  //       {
  //         path: "email",
  //         message: invalidEmail
  //       },
  //       {
  //         path: "password",
  //         message: passwordNotLongEnough
  //       }
  //     ]
  //   });
  // });
});
