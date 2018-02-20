import { InMemoryCache } from 'apollo-cache-inmemory'

import { w3cwebsocket as W3CWebSocket } from 'websocket'

import * as AbsintheSocket from "@absinthe/socket";
import {createAbsintheSocketLink} from "@absinthe/socket-apollo-link";
import {Socket as PhoenixSocket} from "phoenix";

export default (ctx) => {

  let options = {
    transport: process.server ? W3CWebSocket : null
  }

  let link = createAbsintheSocketLink(AbsintheSocket.create(
    new PhoenixSocket('ws://localhost:4000/socket', options)
  ))

  return { link, cache: new InMemoryCache({ addTypename: false }) }
}
