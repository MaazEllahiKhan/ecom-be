import { MigrationInterface, QueryRunner } from "typeorm";

export class FourIndexAddition1720523995110 implements MigrationInterface {
    name = 'FourIndexAddition1720523995110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_search\` DROP COLUMN \`item_no\``);
        await queryRunner.query(`ALTER TABLE \`product_search\` ADD \`item_no\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`product_search\` CHANGE COLUMN \`category_name\` \`category_name\` VARCHAR(255) NULL DEFAULT NULL`);
        await queryRunner.query(`CREATE INDEX \`categoryName-idx\` ON \`product_search\` (\`category_name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_145532db85752b29c57d2b7b1f1\``);
        await queryRunner.query(`DROP INDEX \`REL_145532db85752b29c57d2b7b1f\` ON \`order_items\``);
        await queryRunner.query(`DROP INDEX \`categoryName-idx\` ON \`product_search\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP INDEX \`IDX_145532db85752b29c57d2b7b1f\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_145532db85752b29c57d2b7b1f1\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`orderId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_search\` DROP COLUMN \`category_name\``);
        await queryRunner.query(`ALTER TABLE \`product_search\` ADD \`category_name\` text NULL`);
    }

}
