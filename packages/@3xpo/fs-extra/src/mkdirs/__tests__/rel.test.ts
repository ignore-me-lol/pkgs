'use strict';

const CWD = process.cwd();

import * as fs from 'fs';
import * as os from 'os';
import fse from '../..';
import path from 'path';
import assert from 'assert';

/* global afterEach, beforeEach, describe, it */

describe('mkdirp / relative', () => {
  const CWD = process.cwd();
  let TEST_DIR: string;
  let file: string;

  beforeEach(async () => {
    TEST_DIR = path.join(os.tmpdir(), 'fs-extra-test-suite', 'mkdirp-relative');
    await fse.emptyDir(TEST_DIR);
    const x = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
    const y = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
    const z = Math.floor(Math.random() * Math.pow(16, 4)).toString(16);
    // relative path
    file = path.join(x, y, z);
  });

  afterEach(() => fs.rmSync(TEST_DIR, { recursive: true, force: true }));
  afterAll(() => process.chdir(CWD));

  it('should make the directory with relative path', async () => {
    process.chdir(TEST_DIR);

    await fse.mkdirp(file, 0o755);
    const e = await fse.pathExists(file);
    expect(e).toEqual(true);
    const stat = fs.statSync(file);

    if (os.platform().indexOf('win') === 0)
      expect(stat.mode & 0o777).toEqual(0o666);
    else expect(stat.mode & 0o777).toEqual(0o755);

    expect(stat.isDirectory()).toBeTruthy();
  });
});
