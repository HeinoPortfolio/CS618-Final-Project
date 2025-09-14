// Global Teardown file

export default async function globalTeardown() {
  await global.__MONGOINSTANCE.stop()
}
